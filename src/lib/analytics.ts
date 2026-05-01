const GA4_ID = "G-FMPV82QJV9";

/**
 * Redirects to the Shopify checkout URL while preserving the GA4 session
 * via the cross-domain `_gl` linker parameter.
 */
export function redirectWithAnalytics(checkoutUrl: string) {
  if (typeof window === "undefined") return;

  let redirected = false;

  const fallback = setTimeout(() => {
    if (!redirected) {
      redirected = true;
      window.location.href = checkoutUrl;
    }
  }, 1000);

  if (window.gtag) {
    window.gtag("get", GA4_ID, "client_id", (clientId: string) => {
      if (redirected) return;
      redirected = true;
      clearTimeout(fallback);
      const url = new URL(checkoutUrl);
      url.searchParams.set("_gl", clientId);
      window.location.href = url.toString();
    });
  } else {
    clearTimeout(fallback);
    window.location.href = checkoutUrl;
  }
}
