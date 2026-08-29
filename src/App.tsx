import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./scene/Scene";
import { Timeline } from "./ui/timeline/Timeline";
import { defaultCarnacTimeline } from "./ui/timeline/timeline-model";
import { TitleScreen } from "./ui/title/TitleScreen";
import { Interlude } from "./ui/interlude/Interlude";
import { EndScreen } from "./ui/end/EndScreen";
import { EpilogueSequence } from "./ui/epilogue/EpilogueSequence";
import { useAudio } from "./audio/useAudio";
import { getAudioEngine } from "./audio/audio-engine";
import { voiceProfileFor, type VoiceId } from "./audio/vocalizations";
import { useNarrativeState } from "./narrative/useNarrativeState";
import type { NarrativeState } from "./narrative/narrative-state";
import type { DayPhase } from "./palette";

const phaseOrder: DayPhase[] = ["dawn", "noon", "dusk", "night"];
const GAME_START_YEAR = -4500;

const voiceByKey: Record<string, VoiceId> = {
  "1": "athro",
  "2": "vann",
  "3": "kel",
  "4": "nia",
};

const interludeTexts: Record<NarrativeState, string | undefined> = {
  title: undefined,
  act1: undefined,
  interlude1: "Un jour, comme les autres.",
  act2: undefined,
  interlude2: "L'etoile, encore.",
  act3: undefined,
  epilogue: undefined,
  end: undefined,
};


declare global {
  interface Window {
    __carnacDev?: {
      dispatch: (event: "start" | "advance" | "restart") => void;
      setFlag: (name: string, value: boolean) => void;
    };
  }
}

export function App() {
  const { state, flags, dispatch, setFlag } = useNarrativeState();
  const { muted, toggleMute } = useAudio(state);
  const [phase, setPhase] = useState<DayPhase>("dusk");
  const [showTimeline, setShowTimeline] = useState(true);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    window.__carnacDev = { dispatch, setFlag };
    return () => {
      delete window.__carnacDev;
    };
  }, [dispatch, setFlag]);

  const isInGame = state === "act1" || state === "act2" || state === "act3";
  const interludeText = interludeTexts[state];
  const stonePlaced = flags["stone-placed"] === true;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!isInGame) return;
      if (key === "t") {
        setPhase((current) => {
          const next = (phaseOrder.indexOf(current) + 1) % phaseOrder.length;
          return phaseOrder[next];
        });
      }
      if (key === "f") {
        setShowTimeline((current) => !current);
      }
      if (key === "n") {
        dispatch("advance");
      }
      const voice = voiceByKey[key];
      if (voice) {
        getAudioEngine().playVocal(voiceProfileFor(voice));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isInGame, dispatch]);

  return (
    <>
      <Canvas dpr={[1, 2]} shadows={false}>
        <Scene
          phase={phase}
          showStandingStone={state === "act3"}
          standingStonePlaced={stonePlaced}
          onPlaceStone={() => setFlag("stone-placed", true)}
          onWitnessArrived={() => setFlag("witness-arrived", true)}
          showCampVillagers={state === "act1" || state === "act2"}
        />
      </Canvas>

      {isInGame && showTimeline && (
        <div className="timeline-overlay">
          <Timeline
            timeline={defaultCarnacTimeline}
            cursorYear={GAME_START_YEAR}
          />
        </div>
      )}

      {isInGame && (
        <div className="hud">
          Carnac · {state}
          <small>
            clic Kel · T phase ({phase}) · F frise · N acte suivant · 1-4 voix
          </small>
        </div>
      )}

      {state === "act3" && !stonePlaced && (
        <div className="act-hint">
          clic sur la pierre pour la poser debout
        </div>
      )}

      {state === "act3" && stonePlaced && !flags["witness-arrived"] && (
        <div className="act-hint">
          Vann approche...
        </div>
      )}

      {state === "act3" && flags["witness-arrived"] && (
        <div className="act-hint">
          la tribu regarde en silence · N pour continuer
        </div>
      )}

      {state === "title" && (
        <TitleScreen onStart={() => dispatch("start")} />
      )}

      <button
        type="button"
        className="audio-toggle"
        onClick={toggleMute}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        title={muted ? "Activer le son" : "Couper le son"}
      >
        {muted ? "♪ off" : "♪ on"}
      </button>

      {interludeText && (
        <Interlude
          text={interludeText}
          onContinue={() => dispatch("advance")}
        />
      )}

      {state === "epilogue" && (
        <EpilogueSequence onComplete={() => dispatch("advance")} />
      )}

      {state === "end" && (
        <EndScreen onRestart={() => dispatch("restart")} />
      )}
    </>
  );
}
