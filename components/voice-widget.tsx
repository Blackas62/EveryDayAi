"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "elevenlabs-convai": {
          "agent-id"?: string;
          "default-expanded"?: string;
          transcript?: string;
          children?: React.ReactNode;
        };
      }
    }
  }
}

export function VoiceWidget() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!agentId) return null;

  return (
    <>
      {isDesktop ? (
        <elevenlabs-convai agent-id={agentId} default-expanded="true" transcript="true" />
      ) : (
        <elevenlabs-convai agent-id={agentId} transcript="true" />
      )}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
        type="text/javascript"
      />
    </>
  );
}
