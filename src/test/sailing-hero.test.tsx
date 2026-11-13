import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SailingContent } from "@/components/site-page";

describe("SV Coqui hero", () => {
  it("offers a Follow Along action pointing at the boat's Instagram", () => {
    render(<SailingContent />);

    const cta = screen.getByRole("link", { name: "Follow Along" });

    expect(cta).toHaveAttribute("href", "https://instagram.com/svcoqui");
  });

  it("shows the vessel specifications as a labelled readout", () => {
    render(<SailingContent />);

    expect(screen.getByText("Vessel Specifications")).toBeInTheDocument();

    const terms = screen.getAllByText(/LOA|LWL|Beam|Draft|Disp|Ballast|Air Draft/);
    expect(terms.length).toBeGreaterThanOrEqual(7);
    expect(screen.getByText("42.50 ft")).toBeInTheDocument();
    expect(screen.getByText("Air Draft")).toBeInTheDocument();
    expect(screen.getByText("64.50 ft")).toBeInTheDocument();
  });
});
