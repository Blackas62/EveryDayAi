#!/usr/bin/env python3
"""Build a single Always On Front Desk ConvAI agent on ElevenLabs.

Usage: build-aofd-agent.py <trade>
  trade: plumber | electrician | builder | real-estate
"""
import json
import os
import sys
from pathlib import Path

import requests

API_KEY = os.environ["ELEVENLABS_API_KEY"]
BASE = "https://api.elevenlabs.io/v1"
HEADERS = {"xi-api-key": API_KEY}

CLARA_VOICE_ID = "tyepWYJJwJM9TTFIg5U7"
LLM = "claude-sonnet-4-5"  # match Bruce's existing setup
PROMPTS_DIR = Path(__file__).parent / "aofd-prompts"
OUT_PATH = Path(__file__).parent / "aofd-agents.json"

CONFIGS = {
    "plumber": {
        "name": "AOFD — Sample Plumbing Co",
        "first_message": "Sample Plumbing Co, this is Sam, how can I help today?",
        "prompt_file": "plumber-system-prompt.md",
        "kb_file": "plumber-kb.md",
        "kb_name": "Sample Plumbing Co — KB",
    },
    "electrician": {
        "name": "AOFD — Sample Electrical Co",
        "first_message": "Sample Electrical Co, this is Sam, how can I help?",
        "prompt_file": "electrician-system-prompt.md",
        "kb_file": "electrician-kb.md",
        "kb_name": "Sample Electrical Co — KB",
    },
    "builder": {
        "name": "AOFD — Sample Builders Co",
        "first_message": "Sample Builders Co, Sam speaking — what can I do for you?",
        "prompt_file": "builder-system-prompt.md",
        "kb_file": "builder-kb.md",
        "kb_name": "Sample Builders Co — KB",
    },
    "real-estate": {
        "name": "AOFD — Sample Property Co",
        "first_message": "Sample Property Co, this is Sam, how can I help?",
        "prompt_file": "real-estate-system-prompt.md",
        "kb_file": "real-estate-kb.md",
        "kb_name": "Sample Property Co — KB",
    },
}


def load_prev_state():
    if OUT_PATH.exists():
        return json.loads(OUT_PATH.read_text())
    return {"agents": {}}


def save_state(state):
    OUT_PATH.write_text(json.dumps(state, indent=2))


def upload_kb(name: str, md_path: Path) -> str:
    """Upload a markdown KB doc. ElevenLabs accepts text/html — wrap in <pre>."""
    html = f"<!doctype html><html><body><pre>{md_path.read_text()}</pre></body></html>"
    resp = requests.post(
        f"{BASE}/convai/knowledge-base/file",
        headers=HEADERS,
        files={"file": (md_path.with_suffix(".html").name, html, "text/html")},
        data={"name": name},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["id"]


def create_agent(cfg: dict, kb_id: str) -> str:
    prompt_text = (PROMPTS_DIR / cfg["prompt_file"]).read_text()

    body = {
        "name": cfg["name"],
        "conversation_config": {
            "agent": {
                "language": "en",
                "first_message": cfg["first_message"],
                "prompt": {
                    "prompt": prompt_text,
                    "llm": LLM,
                    "knowledge_base": [
                        {
                            "type": "file",
                            "name": cfg["kb_name"],
                            "id": kb_id,
                            "usage_mode": "auto",
                        }
                    ],
                    "tools": [
                        {"type": "system", "name": "end_call"},
                        {"type": "system", "name": "skip_turn"},
                    ],
                },
            },
            "tts": {
                "voice_id": CLARA_VOICE_ID,
                "model_id": "eleven_turbo_v2",
                "output_format": "pcm_44100",
                "optimize_streaming_latency": 1,
            },
            "conversation": {
                "max_duration_seconds": 240,  # 4 min cap
            },
        },
    }
    resp = requests.post(
        f"{BASE}/convai/agents/create",
        headers={**HEADERS, "Content-Type": "application/json"},
        json=body,
        timeout=30,
    )
    if resp.status_code >= 400:
        print(f"ERROR {resp.status_code}: {resp.text[:600]}", file=sys.stderr)
        resp.raise_for_status()
    return resp.json()["agent_id"]


def main():
    if len(sys.argv) != 2 or sys.argv[1] not in CONFIGS:
        print(__doc__, file=sys.stderr)
        sys.exit(1)

    trade = sys.argv[1]
    cfg = CONFIGS[trade]
    state = load_prev_state()

    print(f"=== Building {trade} ===")
    print(f"  Uploading KB: {cfg['kb_name']}")
    kb_id = upload_kb(cfg["kb_name"], PROMPTS_DIR / cfg["kb_file"])
    print(f"  KB id: {kb_id}")

    print(f"  Creating agent: {cfg['name']}")
    agent_id = create_agent(cfg, kb_id)
    print(f"  Agent id: {agent_id}")

    state["agents"][trade] = {
        "agent_id": agent_id,
        "kb_id": kb_id,
        "name": cfg["name"],
        "first_message": cfg["first_message"],
    }
    save_state(state)
    print(f"\nSaved to {OUT_PATH}")


if __name__ == "__main__":
    main()
