import { describe, it, expect } from "vitest";
import {
  initialNarrativeState,
  transition,
  canTransition,
  availableEvents,
  type NarrativeState,
} from "./narrative-state";

describe("initialNarrativeState", () => {
  it("returns 'title' by default", () => {
    expect(initialNarrativeState()).toBe("title");
  });
});

describe("transition", () => {
  it("goes from title to act1 on 'start'", () => {
    expect(transition("title", "start")).toBe("act1");
  });

  it("progresses through the full narrative on repeated 'advance' events", () => {
    let state: NarrativeState = "act1";
    const sequence: NarrativeState[] = [
      "interlude1",
      "act2",
      "interlude2",
      "act3",
      "epilogue",
      "end",
    ];
    for (const expected of sequence) {
      state = transition(state, "advance");
      expect(state).toBe(expected);
    }
  });

  it("stays on the same state when the event is not applicable", () => {
    expect(transition("title", "advance")).toBe("title");
    expect(transition("act1", "start")).toBe("act1");
    expect(transition("end", "advance")).toBe("end");
  });

  it("restarts to title from end on 'restart'", () => {
    expect(transition("end", "restart")).toBe("title");
  });

  it("does not allow restart from a non-end state", () => {
    expect(transition("act2", "restart")).toBe("act2");
    expect(transition("title", "restart")).toBe("title");
  });
});

describe("canTransition", () => {
  it("returns true for a valid transition", () => {
    expect(canTransition("title", "start")).toBe(true);
    expect(canTransition("act1", "advance")).toBe(true);
    expect(canTransition("end", "restart")).toBe(true);
  });

  it("returns false for an invalid transition", () => {
    expect(canTransition("title", "advance")).toBe(false);
    expect(canTransition("act1", "restart")).toBe(false);
    expect(canTransition("end", "start")).toBe(false);
  });
});

describe("availableEvents", () => {
  it("returns 'start' from title", () => {
    expect(availableEvents("title")).toEqual(["start"]);
  });

  it("returns 'advance' from any act or interlude", () => {
    expect(availableEvents("act1")).toEqual(["advance"]);
    expect(availableEvents("interlude1")).toEqual(["advance"]);
    expect(availableEvents("act2")).toEqual(["advance"]);
    expect(availableEvents("epilogue")).toEqual(["advance"]);
  });

  it("returns 'restart' from end", () => {
    expect(availableEvents("end")).toEqual(["restart"]);
  });
});
