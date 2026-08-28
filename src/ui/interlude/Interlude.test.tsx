import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Interlude } from "./Interlude";

describe("Interlude", () => {
  it("displays the given text", () => {
    render(<Interlude text="Un jour, comme les autres." onContinue={() => {}} />);
    expect(
      screen.getByText("Un jour, comme les autres."),
    ).toBeInTheDocument();
  });

  it("exposes the text as a live region for screen readers", () => {
    render(<Interlude text="Une phrase." onContinue={() => {}} />);
    const region = screen.getByRole("region", { name: /interlude/i });
    expect(region).toHaveAttribute("aria-live", "polite");
  });

  it("shows a hint about how to continue", () => {
    render(<Interlude text="Une phrase." onContinue={() => {}} />);
    expect(
      screen.getByText(/continuer/i),
    ).toBeInTheDocument();
  });

  it("invokes onContinue when the continue button is clicked", async () => {
    const onContinue = vi.fn();
    render(<Interlude text="Une phrase." onContinue={onContinue} />);
    await userEvent.click(
      screen.getByRole("button", { name: /continuer/i }),
    );
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it("does not invoke onContinue on initial render", () => {
    const onContinue = vi.fn();
    render(<Interlude text="Une phrase." onContinue={onContinue} />);
    expect(onContinue).not.toHaveBeenCalled();
  });
});
