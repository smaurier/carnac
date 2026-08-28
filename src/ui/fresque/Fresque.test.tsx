import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fresque, type FresqueVariant } from "./Fresque";

describe("Fresque", () => {
  it("displays the title", () => {
    render(
      <Fresque
        title="La premiere pierre"
        variant="first-stone"
        current={1}
        total={3}
      />,
    );
    expect(screen.getByText(/premiere pierre/i)).toBeInTheDocument();
  });

  it("displays the counter as 'Fresque · X / Y'", () => {
    render(
      <Fresque
        title="Titre"
        variant="first-stone"
        current={1}
        total={3}
      />,
    );
    expect(screen.getByText(/fresque/i)).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
  });

  it("exposes an accessible SVG image with the title as label", () => {
    render(
      <Fresque
        title="La premiere pierre"
        variant="first-stone"
        current={1}
        total={3}
      />,
    );
    const image = screen.getByRole("img", { name: /premiere pierre/i });
    expect(image).toBeInTheDocument();
  });

  it("tags the SVG with the variant name for testability and styling", () => {
    render(
      <Fresque
        title="Titre"
        variant="first-stone"
        current={1}
        total={3}
      />,
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "data-variant",
      "first-stone",
    );
  });

  it("supports the three MVP variants", () => {
    const variants: readonly FresqueVariant[] = [
      "first-stone",
      "encounter",
      "death",
    ];
    for (const variant of variants) {
      const { unmount } = render(
        <Fresque title="T" variant={variant} current={1} total={3} />,
      );
      expect(screen.getByRole("img")).toHaveAttribute("data-variant", variant);
      unmount();
    }
  });

  it("exposes an accessible region labelled 'Fresque parietale'", () => {
    render(
      <Fresque
        title="Titre"
        variant="first-stone"
        current={1}
        total={3}
      />,
    );
    expect(
      screen.getByRole("region", { name: /fresque parietale/i }),
    ).toBeInTheDocument();
  });
});
