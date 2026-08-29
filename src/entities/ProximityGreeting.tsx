import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { getAudioEngine } from "../audio/audio-engine";
import { voiceProfileFor, type VoiceId } from "../audio/vocalizations";

interface VillagerVoiceBinding {
  readonly voice: VoiceId;
  readonly position: [number, number, number];
}

interface ProximityGreetingProps {
  bindings: readonly VillagerVoiceBinding[];
  playerTarget: [number, number];
  radius?: number;
  cooldownMs?: number;
}

const DEFAULT_RADIUS = 2.4;
const DEFAULT_COOLDOWN_MS = 5000;
const playerPos = new Vector3();
const villagerPos = new Vector3();

export function ProximityGreeting({
  bindings,
  playerTarget,
  radius = DEFAULT_RADIUS,
  cooldownMs = DEFAULT_COOLDOWN_MS,
}: ProximityGreetingProps) {
  const lastTriggerRef = useRef<Map<VoiceId, number>>(new Map());
  const inRangeRef = useRef<Set<VoiceId>>(new Set());

  useFrame((state) => {
    playerPos.set(playerTarget[0], 0, playerTarget[1]);
    const nowMs = state.clock.elapsedTime * 1000;

    for (const binding of bindings) {
      villagerPos.set(...binding.position);
      const distance = playerPos.distanceTo(villagerPos);
      const nowInRange = distance <= radius;
      const wasInRange = inRangeRef.current.has(binding.voice);
      const lastTrigger = lastTriggerRef.current.get(binding.voice) ?? -Infinity;

      if (nowInRange && !wasInRange && nowMs - lastTrigger > cooldownMs) {
        getAudioEngine().playVocal(voiceProfileFor(binding.voice));
        lastTriggerRef.current.set(binding.voice, nowMs);
      }

      if (nowInRange) {
        inRangeRef.current.add(binding.voice);
      } else {
        inRangeRef.current.delete(binding.voice);
      }
    }
  });

  return null;
}
