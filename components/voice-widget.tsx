import Script from "next/script";

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
  if (!agentId) return null;

  return (
    <>
      <elevenlabs-convai agent-id={agentId} default-expanded="true" transcript="true" />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
        type="text/javascript"
      />
    </>
  );
}
