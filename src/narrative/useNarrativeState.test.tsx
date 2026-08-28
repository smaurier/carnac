import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useNarrativeState } from "./useNarrativeState";

describe("useNarrativeState", () => {
  it("starts on 'title' with no flags", () => {
    const { result } = renderHook(() => useNarrativeState());
    expect(result.current.state).toBe("title");
    expect(result.current.flags).toEqual({});
  });

  it("dispatch('start') moves to act1", () => {
    const { result } = renderHook(() => useNarrativeState());
    act(() => result.current.dispatch("start"));
    expect(result.current.state).toBe("act1");
  });

  it("ignores invalid events silently", () => {
    const { result } = renderHook(() => useNarrativeState());
    act(() => result.current.dispatch("advance"));
    expect(result.current.state).toBe("title");
  });

  it("progresses through the full narrative when flags allow", () => {
    const { result } = renderHook(() =>
      useNarrativeState({ initial: "act3", initialFlags: { "stone-placed": true } }),
    );
    act(() => result.current.dispatch("advance"));
    act(() => result.current.dispatch("advance"));
    expect(result.current.state).toBe("end");
  });

  it("restarts from end back to title", () => {
    const { result } = renderHook(() => useNarrativeState({ initial: "end" }));
    act(() => result.current.dispatch("restart"));
    expect(result.current.state).toBe("title");
  });

  it("accepts a custom initial state via options", () => {
    const { result } = renderHook(() =>
      useNarrativeState({ initial: "act2" }),
    );
    expect(result.current.state).toBe("act2");
  });

  it("setFlag adds or updates a flag", () => {
    const { result } = renderHook(() => useNarrativeState());
    act(() => result.current.setFlag("stone-placed", true));
    expect(result.current.flags).toEqual({ "stone-placed": true });

    act(() => result.current.setFlag("stone-placed", false));
    expect(result.current.flags).toEqual({ "stone-placed": false });
  });

  it("blocks act3->advance when stone-placed flag is missing", () => {
    const { result } = renderHook(() => useNarrativeState({ initial: "act3" }));
    act(() => result.current.dispatch("advance"));
    expect(result.current.state).toBe("act3");
  });

  it("unblocks act3->advance after setFlag('stone-placed', true)", () => {
    const { result } = renderHook(() => useNarrativeState({ initial: "act3" }));
    act(() => result.current.setFlag("stone-placed", true));
    act(() => result.current.dispatch("advance"));
    expect(result.current.state).toBe("epilogue");
  });

  it("preserves flags across state transitions", () => {
    const { result } = renderHook(() => useNarrativeState({ initial: "act1" }));
    act(() => result.current.setFlag("met-stranger", true));
    act(() => result.current.dispatch("advance"));
    expect(result.current.state).toBe("interlude1");
    expect(result.current.flags["met-stranger"]).toBe(true);
  });
});
