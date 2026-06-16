"use client";

import Script from "next/script";

// LimeChat WhatsApp chat widget. Rendered only on the routes that include this
// component (the landing `/` and `/home`). Loaded via next/script.
const LIMECHAT_WIDGET_URL =
  "https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/lc_wa_widget.js";

const LIMECHAT_CONFIG = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjkxOTE4NzIzNzg5NSIsImlhdCI6MTc4MDMxMTUwM30.7R-wLgtfDr6DYZQxu6dee3R9CkvTmmCJQVBurwBmwyc",
  phoneNumber: "919187237895",
};

// The widget renders a `#whatsapp-cta-button`; we use it to avoid double-init.
const WIDGET_BUTTON_ID = "whatsapp-cta-button";

// IMPORTANT: the remote loader declares `class LimeChatWhatsapp` at global
// (lexical) scope — it is NOT exposed on `window`, so it must be referenced bare
// (like LimeChat's official snippet). The instance also has a built-in
// `pageCheck` whose targeting only understands Shopify URL paths (`/`,
// `/collections/*`, `/products/*`, …) and so refuses to render on `/home`; we
// override it to always match (this component is only mounted on `/` and
// `/home`, so the widget can't leak onto other routes).
declare const LimeChatWhatsapp: new (config: typeof LIMECHAT_CONFIG) => {
  initializeWidget: () => void;
  pageCheck: (pages?: unknown) => boolean;
};

function renderLimeChatWidget() {
  if (typeof document === "undefined") return;
  // Already rendered (e.g. it persisted across a client-side navigation).
  if (document.getElementById(WIDGET_BUTTON_ID)) return;
  if (typeof LimeChatWhatsapp === "undefined") return;

  const widget = new LimeChatWhatsapp(LIMECHAT_CONFIG);
  // Bypass the widget's Shopify-only page targeting so it shows on `/home`.
  widget.pageCheck = () => true;
  widget.initializeWidget();
}

export function LimeChatWidget() {
  return (
    <Script
      id="limechat-wa-widget"
      src={LIMECHAT_WIDGET_URL}
      strategy="afterInteractive"
      // `onReady` fires after load AND on every mount, so the widget is
      // (re)initialised on each route that renders it (unlike `onLoad`).
      onReady={renderLimeChatWidget}
    />
  );
}
