export type SiteView = "portfolio" | "sailing";

const PORTFOLIO_HOST = "portfolio.littlefuzzydinos.com";
const SAILING_HOST = "sailing.littlefuzzydinos.com";

export function getDefaultView(hostname: string, pathname: string): SiteView {
  return hostname.startsWith("sailing.") || pathname === "/sailing" ? "sailing" : "portfolio";
}

export function getProductionDestination(view: SiteView, hostname: string): string | null {
  if (hostname !== PORTFOLIO_HOST && hostname !== SAILING_HOST) return null;
  return `https://${view === "sailing" ? SAILING_HOST : PORTFOLIO_HOST}`;
}

export type SiteMeta = { title: string; icon: string };

// Tab title and icon for the active mode. The static /favicon.ico declared in the
// root head stays the fallback until applySiteMeta swaps in the mode-specific one.
export function getSiteMeta(view: SiteView): SiteMeta {
  return view === "sailing"
    ? { title: "SV Coqui", icon: "/favicon-sailing.ico" }
    : { title: "Mary Franks", icon: "/favicon-portfolio.ico" };
}
