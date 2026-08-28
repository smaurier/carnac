import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useNarrativeState } from "./useNarrativeState";

describe("useNarrativeState", () => {
  it("starts on 'title'", () => {
    const { result } = renderHook(() => useNarrativeState());
    expect(result.current.state).toBe("title");
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

  it("progresses through the full narrative", () => {
    const { result } = renderHook(() => useNarrativeState());
    act(() => result.current.dispatch("start"));
    act(() => result.current.dispatch("advance"));
    act(() => result.current.dispatch("advance"));
    act(() => result.current.dispatch("advance"));
    act(() => result.current.dispatch("advance"));
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
});
