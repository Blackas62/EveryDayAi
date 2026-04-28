"use client";

import Script from "next/script";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "elevenlabs-convai": {
          "agent-id"?: string;
          "default-expanded"?: string;
          transcript?: string;
          "dynamic-variables"?: string;
          children?: React.ReactNode;
        };
      }
    }
  }
}

type Props = {
  agentId: string;
};

export function DemoWidget({ agentId }: Props) {
  return (
    <>
      <elevenlabs-convai agent-id={agentId} transcript="true" />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
        type="text/javascript"
      />
    </>
  );
}
