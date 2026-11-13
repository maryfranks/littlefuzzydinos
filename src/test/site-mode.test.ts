import { describe, expect, it } from "vitest";

import { getDefaultView, getProductionDestination, getSiteMeta } from "@/lib/site-mode";

describe("Site view selection", () => {
  it("uses Sailing on the sailing subdomain", () => {
    expect(getDefaultView("sailing.littlefuzzydinos.com", "/")).toBe("sailing");
  });

  it("uses Sailing on the /sailing path", () => {
    expect(getDefaultView("localhost", "/sailing")).toBe("sailing");
  });

  it("uses Portfolio elsewhere, including localhost", () => {
    expect(getDefaultView("localhost", "/")).toBe("portfolio");
    expect(getDefaultView("portfolio.littlefuzzydinos.com", "/")).toBe("portfolio");
  });

  it("navigates between the two production domains", () => {
    expect(getProductionDestination("sailing", "portfolio.littlefuzzydinos.com")).toBe("https://sailing.littlefuzzydinos.com");
    expect(getProductionDestination("portfolio", "sailing.littlefuzzydinos.com")).toBe("https://portfolio.littlefuzzydinos.com");
  });

  it("keeps preview and localhost switching local", () => {
    expect(getProductionDestination("sailing", "localhost")).toBeNull();
    expect(getProductionDestination("sailing", "id-preview--example.lovable.app")).toBeNull();
  });

  it("gives Portfolio its own tab title and icon", () => {
    expect(getSiteMeta("portfolio")).toEqual({ title: "Mary Franks", icon: "/favicon-portfolio.ico" });
  });

  it("gives Sailing its own tab title and icon", () => {
    expect(getSiteMeta("sailing")).toEqual({ title: "SV Coqui", icon: "/favicon-sailing.ico" });
  });
});
