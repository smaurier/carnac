import { useEffect, useState } from "react";
import type { NarrativeState } from "../narrative/narrative-state";
import { getAudioEngine } from "./audio-engine";
import { dronePresetFor } from "./drone-presets";

interface UseAudioResult {
  readonly muted: boolean;
  readonly toggleMute: () => void;
}

export function useAudio(state: NarrativeState): UseAudioResult {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const engine = getAudioEngine();
    engine.applyPreset(dronePresetFor(state));
  }, [state]);

  useEffect(() => {
    getAudioEngine().setMuted(muted);
  }, [muted]);

  return {
    muted,
    toggleMute: () => setMuted((prev) => !prev),
  };
}
