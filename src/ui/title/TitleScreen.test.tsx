import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TitleScreen } from "./TitleScreen";

describe("TitleScreen", () => {
  it("displays the game title 'Carnac' as a heading", () => {
    render(<TitleScreen onStart={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /carnac/i }),
    ).toBeInTheDocument();
  });

  it("displays the subtitle 'Bretagne · Néolithique moyen'", () => {
    render(<TitleScreen onStart={() => {}} />);
    expect(
      screen.getByText(/Bretagne.*Néolithique moyen/i),
    ).toBeInTheDocument();
  });

  it("embeds the deep-time timeline region", () => {
    render(<TitleScreen onStart={() => {}} />);
    expect(
      screen.getByRole("region", { name: /frise du temps profond/i }),
    ).toBeInTheDocument();
  });

  it("renders a 'commencer' start button", () => {
    render(<TitleScreen onStart={() => {}} />);
    expect(
      screen.getByRole("button", { name: /commencer/i }),
    ).toBeInTheDocument();
  });

  it("invokes onStart when the button is clicked", async () => {
    const onStart = vi.fn();
    render(<TitleScreen onStart={onStart} />);
    await userEvent.click(
      screen.getByRole("button", { name: /commencer/i }),
    );
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("does not invoke onStart on initial render", () => {
    const onStart = vi.fn();
    render(<TitleScreen onStart={onStart} />);
    expect(onStart).not.toHaveBeenCalled();
  });
});
