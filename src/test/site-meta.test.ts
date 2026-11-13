import { describe, expect, it } from "vitest";

import { applySiteMeta } from "@/lib/site-meta";
import { Route as RootRoute } from "@/routes/__root";
import { Route as PortfolioRoute } from "@/routes/index";
import { Route as SailingRoute } from "@/routes/sailing";

type Head = {
  meta?: { title?: string }[];
  links?: { rel?: string; href?: string }[];
};

function headOf(route: { options: { head?: unknown } }): Head {
  return (route.options.head as () => Head)();
}

function iconHref() {
  return document.querySelector('link[rel="icon"]')?.getAttribute("href");
}

describe("Tab title and icon", () => {
  it("keeps /favicon.ico declared as the static fallback icon", () => {
    const { links } = headOf(RootRoute);
    expect(links?.some((link) => link.rel === "icon" && link.href === "/favicon.ico")).toBe(true);
  });

  it("declares the portfolio route title as Mary Franks", () => {
    expect(headOf(PortfolioRoute).meta?.some((entry) => entry.title === "Mary Franks")).toBe(true);
  });

  it("declares the sailing route title as SV Coqui", () => {
    expect(headOf(SailingRoute).meta?.some((entry) => entry.title === "SV Coqui")).toBe(true);
  });

  it("swaps the tab to Portfolio title and icon", () => {
    applySiteMeta("portfolio");
    expect(document.title).toBe("Mary Franks");
    expect(iconHref()).toBe("/favicon-portfolio.ico");
  });

  it("swaps the tab to Sailing title and icon", () => {
    applySiteMeta("sailing");
    expect(document.title).toBe("SV Coqui");
    expect(iconHref()).toBe("/favicon-sailing.ico");
  });
});
