export interface KeyframeValues {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
  starOffset: number;
  opacity: number;
}

export interface SectionKeyframe {
  id: string;
  values: KeyframeValues;
}

/**
 * Section keyframes — every placement is intentional:
 *
 * hero:     Top-right of viewport, beside the hero headline. Facing the user.
 * trustbar: Far-right edge, scaled small & dim. Acts as a watermark while stats are in focus.
 * services: Far-right edge, small & subtle. Content cards are the star here, model stays out of the way.
 * pillars:  Right side, medium scale. Visible companion to the accordion list on the left.
 * about:    Center, large & pushed back (z). Glowing watermark behind the Manifesto text.
 * work:     Far-right edge again, small. Cards are the focus, model is a subtle accent.
 * contact:  Center-left, fading down. Begins settling towards footer logo position.
 */
export const sectionsConfig: SectionKeyframe[] = [
  {
    id: 'hero',
    values: { x: 3.5, y: 0.5, z: 0, rx: 0.15, ry: -0.3, rz: -0.05, scale: 1.1, starOffset: 0.0, opacity: 0.9 },
  },
  {
    id: 'trustbar',
    values: { x: 5.0, y: 0.0, z: -1.0, rx: 0.1, ry: -0.2, rz: 0.0, scale: 0.5, starOffset: 0.05, opacity: 0.25 },
  },
  {
    id: 'services',
    values: { x: 5.2, y: -0.3, z: -1.5, rx: 0.3, ry: 0.6, rz: 0.1, scale: 0.45, starOffset: 0.1, opacity: 0.2 },
  },
  {
    id: 'pillars',
    values: { x: 4.5, y: 0.0, z: -0.2, rx: 0.1, ry: -0.35, rz: 0.0, scale: 0.85, starOffset: 0.2, opacity: 0.85 },
  },
  {
    id: 'about',
    values: { x: 0.0, y: 0.0, z: 1.5, rx: 0.05, ry: 2.0, rz: 0.05, scale: 1.3, starOffset: 0.0, opacity: 0.08 },
  },
  {
    id: 'work',
    values: { x: 5.0, y: -0.2, z: -1.0, rx: 0.3, ry: -0.4, rz: 0.15, scale: 0.5, starOffset: 0.1, opacity: 0.25 },
  },
  {
    id: 'contact',
    values: { x: 0.0, y: -3.5, z: -2.0, rx: 0.0, ry: 0.0, rz: 0.0, scale: 0.1, starOffset: 0.0, opacity: 0.0 },
  },
];

export function interpolateSections(
  scrollY: number,
  maxScrollY: number,
  navLogoCoords: KeyframeValues,
  footerLogoCoords: KeyframeValues
): KeyframeValues {
  const startThreshold = 120;
  const endThreshold = 150;

  // 1. Navbar logo → Hero breakout
  if (scrollY < startThreshold) {
    const t = scrollY / startThreshold;
    const easedT = t * t * (3 - 2 * t);
    return lerpKeyframes(navLogoCoords, sectionsConfig[0].values, easedT);
  }

  // 2. Contact → Footer logo settle
  if (scrollY > maxScrollY - endThreshold) {
    const t = Math.min(1, (scrollY - (maxScrollY - endThreshold)) / endThreshold);
    const easedT = t * t * (3 - 2 * t);
    return lerpKeyframes(sectionsConfig[sectionsConfig.length - 1].values, footerLogoCoords, easedT);
  }

  // 3. Section-to-section interpolation
  const offsets = sectionsConfig.map((sec, idx) => {
    if (idx === 0) return startThreshold;
    const el = document.getElementById(sec.id);
    if (el) return el.offsetTop;
    // Fallback: distribute evenly
    return startThreshold + ((maxScrollY - endThreshold - startThreshold) / (sectionsConfig.length - 1)) * idx;
  });

  // Clamp: if past the last offset, return last section values
  if (scrollY >= offsets[offsets.length - 1]) {
    return sectionsConfig[sectionsConfig.length - 1].values;
  }

  // Find the two surrounding keyframes
  let prevIdx = 0;
  let nextIdx = sectionsConfig.length - 1;

  for (let i = 0; i < offsets.length - 1; i++) {
    if (scrollY >= offsets[i] && scrollY <= offsets[i + 1]) {
      prevIdx = i;
      nextIdx = i + 1;
      break;
    }
  }

  const range = offsets[nextIdx] - offsets[prevIdx];
  const t = range === 0 ? 0 : (scrollY - offsets[prevIdx]) / range;
  const easedT = t * t * (3 - 2 * t);

  return lerpKeyframes(sectionsConfig[prevIdx].values, sectionsConfig[nextIdx].values, easedT);
}

function lerpKeyframes(a: KeyframeValues, b: KeyframeValues, t: number): KeyframeValues {
  const lerp = (from: number, to: number) => from + (to - from) * t;
  return {
    x: lerp(a.x, b.x),
    y: lerp(a.y, b.y),
    z: lerp(a.z, b.z),
    rx: lerp(a.rx, b.rx),
    ry: lerp(a.ry, b.ry),
    rz: lerp(a.rz, b.rz),
    scale: lerp(a.scale, b.scale),
    starOffset: lerp(a.starOffset, b.starOffset),
    opacity: lerp(a.opacity, b.opacity),
  };
}
