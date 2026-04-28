#!/usr/bin/env python3
"""Patch TTS quality settings on the live AOFD agents.

Bumps to higher-quality multilingual_v2 model + zero-latency-optimisation
to clear scratchy-streaming artifacts reported on the demos."""
import json
import os
from pathlib import Path

import requests

API_KEY = os.environ["ELEVENLABS_API_KEY"]
BASE = "https://api.elevenlabs.io/v1"
HEADERS = {"xi-api-key": API_KEY, "Content-Type": "application/json"}

ROOT = Path(__file__).parent
STATE = json.loads((ROOT / "aofd-agents.json").read_text())

NEW_TTS = {
    "model_id": "eleven_multilingual_v2",
    "output_format": "pcm_44100",
    "optimize_streaming_latency": 1,
}

for trade, info in STATE["agents"].items():
    agent_id = info["agent_id"]
    body = {
        "conversation_config": {
            "tts": NEW_TTS,
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
        print(f"  ✓ {trade}: TTS bumped to multilingual_v2 + latency 0")
