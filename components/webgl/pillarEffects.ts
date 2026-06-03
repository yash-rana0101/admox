/**
 * Calculates dynamic WebGL visual targets based on the active hovered pillar.
 * Each pillar triggers a distinct visual behavior in the 3D model.
 */
export interface PillarEffects {
  speedMult: number;
  emissiveInt: number;
  scaleOffset: number;
  oscillateZ: number;
  starOffsetBonus: number;
}

export function getPillarEffects(activePillar: number): PillarEffects {
  const defaults: PillarEffects = {
    speedMult: 1.0,
    emissiveInt: 1.2,
    scaleOffset: 0.0,
    oscillateZ: 0.0,
    starOffsetBonus: 0.0,
  };

  switch (activePillar) {
    case 0: // Creativity — star floats out
      return { ...defaults, speedMult: 1.8, starOffsetBonus: 0.15 };
    case 1: // Innovation — fast spin, intense glow
      return { ...defaults, speedMult: 3.8, emissiveInt: 4.0 };
    case 2: // Performance — slow spin, scale pulse
      return { ...defaults, speedMult: 0.4, scaleOffset: 0.18 };
    case 3: // Storytelling — wavy Z-axis rock
      return { ...defaults, oscillateZ: Math.sin(Date.now() * 0.003) * 0.18 };
    case 4: // Growth — medium spin, slight scale
      return { ...defaults, speedMult: 2.4, scaleOffset: 0.08 };
    default:
      return defaults;
  }
}
