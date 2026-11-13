import { getSiteMeta, type SiteView } from "@/lib/site-mode";

// Keeps the browser tab title and icon in sync with the active mode. The root head
// declares /favicon.ico as the static fallback; this swaps that same link's href so
// the head never carries two competing icon declarations.
export function applySiteMeta(view: SiteView) {
  if (typeof document === "undefined") return;

  const { title, icon } = getSiteMeta(view);
  document.title = title;

  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    document.head.appendChild(link);
  }
  link.href = icon;
}
