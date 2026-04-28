#!/usr/bin/env python3
"""Patch system prompts on the live AOFD agents from local prompt files."""
import json
import os
from pathlib import Path

import requests

API_KEY = os.environ["ELEVENLABS_API_KEY"]
BASE = "https://api.elevenlabs.io/v1"
HEADERS = {"xi-api-key": API_KEY, "Content-Type": "application/json"}

ROOT = Path(__file__).parent
PROMPTS = ROOT / "aofd-prompts"
STATE = json.loads((ROOT / "aofd-agents.json").read_text())

PROMPT_FILE = {
    "plumber": "plumber-system-prompt.md",
    "electrician": "electrician-system-prompt.md",
    "builder": "builder-system-prompt.md",
    "real-estate": "real-estate-system-prompt.md",
}

for trade, info in STATE["agents"].items():
    agent_id = info["agent_id"]
    prompt_text = (PROMPTS / PROMPT_FILE[trade]).read_text()
    body = {
        "conversation_config": {
            "agent": {
                "prompt": {
                    "prompt": prompt_text,
                }
            }
        }
    }
    resp = requests.patch(
        f"{BASE}/convai/agents/{agent_id}",
        headers=HEADERS,
        json=body,
        timeout=30,
    )
    if resp.status_code >= 400:
        print(f"  ✗ {trade}: HTTP {resp.status_code} — {resp.text[:200]}")
    else:
        print(f"  ✓ {trade}: prompt updated ({len(prompt_text)} chars)")
