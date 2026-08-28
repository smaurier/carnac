import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Timeline } from "./Timeline";
import { defaultCarnacTimeline } from "./timeline-model";

describe("Timeline", () => {
  it("renders every epoch label from the timeline", () => {
    render(<Timeline timeline={defaultCarnacTimeline} cursorYear={-4500} />);
    for (const epoch of defaultCarnacTimeline.epochs) {
      expect(screen.getAllByText(epoch.label).length).toBeGreaterThan(0);
    }
  });

  it("marks the epoch containing the cursor as active", () => {
    render(<Timeline timeline={defaultCarnacTimeline} cursorYear={-4500} />);
    const labels = screen.getAllByText("Néolithique moyen");
    const epochLabel = labels.find(
      (el) => el.getAttribute("data-active") !== null,
    );
    expect(epochLabel).toHaveAttribute("data-active", "true");
  });

  it("marks non-active epochs as inactive", () => {
    render(<Timeline timeline={defaultCarnacTimeline} cursorYear={-4500} />);
    const bronze = screen.getByText("Âge du Bronze");
    expect(bronze).toHaveAttribute("data-active", "false");
  });

  it("positions the cursor at the calculated percentage", () => {
    render(<Timeline timeline={defaultCarnacTimeline} cursorYear={-4500} />);
    const cursor = screen.getByTestId("timeline-cursor");
    expect(cursor.style.left).toMatch(/^84\./);
  });

  it("exposes an accessible region labelled 'Frise du temps profond'", () => {
    render(<Timeline timeline={defaultCarnacTimeline} cursorYear={-4500} />);
    const region = screen.getByRole("region", {
      name: /frise du temps profond/i,
    });
    expect(region).toBeInTheDocument();
  });

  it("displays the cursor year with an en-dash minus for BC dates", () => {
    render(<Timeline timeline={defaultCarnacTimeline} cursorYear={-4500} />);
    expect(screen.getByText("−4500")).toBeInTheDocument();
  });

  it("moves the cursor when cursorYear prop changes", () => {
    const { rerender } = render(
      <Timeline timeline={defaultCarnacTimeline} cursorYear={-4500} />,
    );
    const first = screen.getByTestId("timeline-cursor").style.left;

    rerender(<Timeline timeline={defaultCarnacTimeline} cursorYear={2026} />);
    const second = screen.getByTestId("timeline-cursor").style.left;

    expect(second).not.toBe(first);
    expect(second).toBe("100%");
  });
});
