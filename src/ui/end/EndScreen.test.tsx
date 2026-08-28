import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EndScreen } from "./EndScreen";

describe("EndScreen", () => {
  it("displays the closing phrase 'Les pierres sont restees. Nous aussi.'", () => {
    render(<EndScreen onRestart={() => {}} />);
    expect(screen.getByText(/pierres sont rest/i)).toBeInTheDocument();
    expect(screen.getByText(/nous aussi/i)).toBeInTheDocument();
  });

  it("exposes an accessible region labelled 'Ecran final'", () => {
    render(<EndScreen onRestart={() => {}} />);
    expect(
      screen.getByRole("region", { name: /ecran final/i }),
    ).toBeInTheDocument();
  });

  it("renders a restart button", () => {
    render(<EndScreen onRestart={() => {}} />);
    expect(
      screen.getByRole("button", { name: /revenir/i }),
    ).toBeInTheDocument();
  });

  it("invokes onRestart when the restart button is clicked", async () => {
    const onRestart = vi.fn();
    render(<EndScreen onRestart={onRestart} />);
    await userEvent.click(
      screen.getByRole("button", { name: /revenir/i }),
    );
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it("does not invoke onRestart on initial render", () => {
    const onRestart = vi.fn();
    render(<EndScreen onRestart={onRestart} />);
    expect(onRestart).not.toHaveBeenCalled();
  });
});
