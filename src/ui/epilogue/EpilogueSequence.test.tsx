import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EpilogueSequence } from "./EpilogueSequence";
import type { EpilogueEntry } from "./epilogue-timeline";

const shortSequence: readonly EpilogueEntry[] = [
  { id: "a", year: -4500, title: "Premiere", variant: "first-stone", durationMs: 1000 },
  { id: "b", year: -1000, title: "Deuxieme", variant: "encounter", durationMs: 1000 },
  { id: "c", year: 2026, title: "Troisieme", variant: "first-stone", durationMs: 1000 },
];

describe("EpilogueSequence", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the first entry initially", () => {
    render(<EpilogueSequence sequence={shortSequence} onComplete={() => {}} />);
    expect(screen.getByText("Premiere")).toBeInTheDocument();
  });

  it("advances to the next entry after the duration elapses", () => {
    render(<EpilogueSequence sequence={shortSequence} onComplete={() => {}} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Deuxieme")).toBeInTheDocument();
  });

  it("calls onComplete after the last entry duration", () => {
    const onComplete = vi.fn();
    render(<EpilogueSequence sequence={shortSequence} onComplete={onComplete} />);
    act(() => { vi.advanceTimersByTime(1000); });
    act(() => { vi.advanceTimersByTime(1000); });
    act(() => { vi.advanceTimersByTime(1000); });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("advances entries step by step across ticks", () => {
    render(<EpilogueSequence sequence={shortSequence} onComplete={() => {}} />);
    expect(screen.getByText("Premiere")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText("Deuxieme")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText("Troisieme")).toBeInTheDocument();
  });

  it("does not call onComplete before the sequence ends", () => {
    const onComplete = vi.fn();
    render(<EpilogueSequence sequence={shortSequence} onComplete={onComplete} />);
    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("exposes a skip button that jumps to onComplete immediately", async () => {
    vi.useRealTimers();
    const onComplete = vi.fn();
    render(<EpilogueSequence sequence={shortSequence} onComplete={onComplete} />);
    await userEvent.click(screen.getByRole("button", { name: /passer/i }));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
