#!/usr/bin/env bash
# Update Bruce (ElevenLabs ConvAI) to reflect the discovery-call-first funnel.
#
# What this does:
#   1. Uploads docs/assistant-kb-packages.html as a new KB file on ElevenLabs.
#   2. Fetches Bruce's current agent config (so we preserve other KB sources
#      + the existing system prompt blocks we're not touching).
#   3. Prepends a new "FUNNEL — CRITICAL" rule block to the system prompt.
#   4. Patches the agent: swaps the old "Package FAQ" KB doc for the new one,
#      keeps the other KB docs intact.
#   5. Verifies by re-fetching and echoing the new funnel block + KB list.
#
# Prereqs (SAFE to run — reads ~/.graham-secrets, not committed):
#   export ELEVENLABS_API_KEY + NEXT_PUBLIC_ELEVENLABS_AGENT_ID
#   (or sources them from ~/.graham-secrets + Vercel env as below)
#
# Usage:
#   cd ~/everydayai && bash scripts/update-bruce-funnel.sh
#
# Reference: project_elevenlabs_bruce_kb_management.md

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KB_HTML="$REPO_ROOT/docs/assistant-kb-packages.html"

if [[ ! -f "$KB_HTML" ]]; then
  echo "ERROR: KB HTML not found at $KB_HTML" >&2
  exit 1
fi

# --- Load credentials --------------------------------------------------------
if [[ -z "${ELEVENLABS_API_KEY:-}" ]]; then
  if [[ -f ~/.graham-secrets ]]; then
    # shellcheck source=/dev/null
    source ~/.graham-secrets
  fi
fi
if [[ -z "${ELEVENLABS_API_KEY:-}" ]]; then
  echo "ERROR: ELEVENLABS_API_KEY not set. Source ~/.graham-secrets first." >&2
  exit 1
fi

if [[ -z "${AGENT_ID:-}" ]]; then
  # Pull from Vercel production env
  echo "Pulling NEXT_PUBLIC_ELEVENLABS_AGENT_ID from Vercel..."
  cd "$REPO_ROOT"
  vercel env pull .env.vercel.tmp --environment=production --yes >/dev/null
  AGENT_ID=$(grep "^NEXT_PUBLIC_ELEVENLABS_AGENT_ID=" .env.vercel.tmp | cut -d= -f2- | tr -d '"' | tr -d "'")
  rm -f .env.vercel.tmp
fi
if [[ -z "${AGENT_ID}" ]]; then
  echo "ERROR: Could not resolve AGENT_ID." >&2
  exit 1
fi
echo "Using agent: $AGENT_ID"

# --- 1. Upload the new KB file ----------------------------------------------
KB_NAME="Package FAQ and Graham bio (v3 — discovery-first funnel)"
echo "Uploading new KB file: $KB_NAME"
UPLOAD_RESP=$(curl -sS -X POST "https://api.elevenlabs.io/v1/convai/knowledge-base/file" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}" \
  -F "file=@${KB_HTML};type=text/html" \
  -F "name=${KB_NAME}")
NEW_DOC_ID=$(echo "$UPLOAD_RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))")
if [[ -z "$NEW_DOC_ID" ]]; then
  echo "ERROR: KB upload failed. Response:" >&2
  echo "$UPLOAD_RESP" >&2
  exit 1
fi
echo "New KB doc id: $NEW_DOC_ID"

# --- 2. Fetch current agent config ------------------------------------------
echo "Fetching current agent config..."
AGENT_CFG=$(curl -sS "https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}")

# Save for reference / rollback
ROLLBACK="$REPO_ROOT/scripts/bruce-agent-backup-$(date +%Y%m%d-%H%M%S).json"
echo "$AGENT_CFG" > "$ROLLBACK"
echo "Backup saved: $ROLLBACK"

# --- 3. Compute the new system prompt + new knowledge_base ------------------
#
# Prepends a FUNNEL block, swaps any KB entry whose name starts with
# "Package FAQ" for the new doc id. Leaves other KB entries alone.
#
# Pass data via env vars + file (not heredoc substitution) so embedded
# newlines and quotes in the agent config don't break Python's parser.
AGENT_CFG_FILE="$REPO_ROOT/scripts/.bruce-agent-current.json"
echo "$AGENT_CFG" > "$AGENT_CFG_FILE"

NEW_DOC_ID="$NEW_DOC_ID" KB_NAME="$KB_NAME" AGENT_CFG_FILE="$AGENT_CFG_FILE" \
python3 > "$REPO_ROOT/scripts/bruce-patch-body.json" <<'PYEOF'
import json, os, re

new_doc_id = os.environ["NEW_DOC_ID"]
new_doc_name = os.environ["KB_NAME"]
with open(os.environ["AGENT_CFG_FILE"]) as f:
    cfg = json.load(f)

agent = cfg["conversation_config"]["agent"]
prompt_obj = agent["prompt"]
existing_prompt = prompt_obj.get("prompt", "")

funnel_block = """FUNNEL — CRITICAL (2026-04-24):
- There is NO self-serve purchase path on the website. A visitor cannot buy the $2,500 AI Readiness Review, the $12,000 Sprint, or the $1,500/month Retainer directly on the site.
- The ONLY path to any paid engagement is: (1) book a free 30-minute discovery call with Graham via the services page, (2) if the fit is right, Graham emails them a secure payment link and a booking link for the kickoff interview.
- If a caller asks "how do I buy", "can I purchase now", "is there a checkout", or "where is the payment link", ALWAYS answer: "Every engagement starts with a free 30-minute discovery call with Graham. You can book that directly from the services page. Graham qualifies every engagement on a call first. If it's the right fit, he emails you a secure payment link and a booking link for the kickoff."
- DO NOT send anyone to a Stripe page, a checkout URL, or any self-serve purchase flow. That flow does not exist.
- The free discovery call is 30 minutes, not 20 minutes. Any earlier reference to 20 minutes is outdated.

"""

# Avoid double-prepending if re-run.
if "FUNNEL — CRITICAL" not in existing_prompt:
    new_prompt = funnel_block + existing_prompt
else:
    # Replace the old FUNNEL block with the new one to keep content in sync.
    new_prompt = re.sub(
        r"FUNNEL — CRITICAL.*?(?=\n[A-Z][A-Z /]+ — CRITICAL|\Z)",
        funnel_block.rstrip() + "\n\n",
        existing_prompt,
        count=1,
        flags=re.DOTALL,
    )

# Swap the old Package FAQ KB doc for the new one; preserve other KBs.
kb = prompt_obj.get("knowledge_base", [])
new_kb = []
replaced = False
for entry in kb:
    n = (entry.get("name") or "").lower()
    if n.startswith("package faq") and not replaced:
        new_kb.append({
            "type": "file",
            "name": new_doc_name,
            "id": new_doc_id,
            "usage_mode": entry.get("usage_mode", "auto"),
        })
        replaced = True
    else:
        new_kb.append(entry)

if not replaced:
    new_kb.append({
        "type": "file",
        "name": new_doc_name,
        "id": new_doc_id,
        "usage_mode": "auto",
    })

patch = {
    "conversation_config": {
        "agent": {
            "prompt": {
                "prompt": new_prompt,
                "knowledge_base": new_kb,
            }
        }
    }
}
print(json.dumps(patch))
PYEOF
rm -f "$AGENT_CFG_FILE"

PATCH_BODY="$REPO_ROOT/scripts/bruce-patch-body.json"
if [[ ! -s "$PATCH_BODY" ]]; then
  echo "ERROR: patch body is empty — python step failed." >&2
  exit 1
fi

# --- 4. PATCH the agent ------------------------------------------------------
echo "Patching agent with new prompt + KB..."
PATCH_RESP=$(curl -sS -X PATCH "https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}" \
  -H "Content-Type: application/json" \
  --data-binary @"$PATCH_BODY")
echo "Patch response (truncated):"
echo "$PATCH_RESP" | head -c 400
echo

# --- 5. Verify ---------------------------------------------------------------
echo "Waiting 5s for propagation..."
sleep 5
VERIFY=$(curl -sS "https://api.elevenlabs.io/v1/convai/agents/${AGENT_ID}" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}")
echo
echo "=== FUNNEL block in current prompt (first match) ==="
echo "$VERIFY" | python3 -c "import sys,json; p=json.load(sys.stdin)['conversation_config']['agent']['prompt']['prompt']; import re; m=re.search(r'FUNNEL — CRITICAL.*?(?=\n[A-Z][A-Z /]+ — CRITICAL|\Z)', p, re.DOTALL); print(m.group(0)[:800] if m else '(FUNNEL block NOT found — check patch response)')"
echo
echo "=== Knowledge base entries ==="
echo "$VERIFY" | python3 -c "import sys,json; kb=json.load(sys.stdin)['conversation_config']['agent']['prompt']['knowledge_base']; [print(f\"  {e.get('type')}: {e.get('name')} ({e.get('id')})\") for e in kb]"

# Cleanup
rm -f "$PATCH_BODY"

echo
echo "Done. Test by talking to Bruce on the website — ask 'how do I buy the Review?' and confirm he directs you to the free discovery call."
echo "Rollback available at: $ROLLBACK"
