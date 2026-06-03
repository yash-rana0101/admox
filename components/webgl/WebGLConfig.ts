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

export const sectionsConfig: SectionKeyframe[] = [
  {
    id: 'hero', // Hero Section (floats on the right of header text)
    values: { x: 2.8, y: 0.1, z: 0, rx: 0.2, ry: -0.5, rz: -0.1, scale: 1.2, starOffset: 0.0, opacity: 1 },
  },
  {
    id: 'services', // Services Section (floats on the left beside services card)
    values: { x: -2.8, y: -0.2, z: -0.5, rx: 0.4, ry: 0.8, rz: 0.2, scale: 0.9, starOffset: 0.25, opacity: 1 },
  },
  {
    id: 'pillars', // Pillars Section (floats on the right of pillars list)
    values: { x: 2.8, y: 0.1, z: -0.3, rx: -0.2, ry: 1.5, rz: -0.2, scale: 1.0, starOffset: 0.35, opacity: 1 },
  },
  {
    id: 'about', // Manifesto Section (glowing centered watermark backdrop)
    values: { x: 0.0, y: 0.0, z: 1.2, rx: 0.1, ry: 2.2, rz: 0.1, scale: 1.35, starOffset: 0.05, opacity: 1 },
  },
  {
    id: 'work', // Who We Serve Section (floats on the right side)
    values: { x: 2.8, y: -0.3, z: -0.5, rx: 0.5, ry: -0.5, rz: 0.3, scale: 0.8, starOffset: 0.2, opacity: 1 },
  },
  {
    id: 'contact', // CTA Section (fades out down off-screen)
    values: { x: 0.0, y: -4.0, z: -1.0, rx: 0.8, ry: 0.5, rz: 0.0, scale: 0.4, starOffset: 0.0, opacity: 0 },
  },
];

export function interpolateSections(scrollY: number): KeyframeValues {
  // 1. Get offsetTop positions of each section element
  const offsets = sectionsConfig.map((sec, idx) => {
    if (idx === 0) return 0;
    const el = document.getElementById(sec.id);
    return el ? el.offsetTop : window.innerHeight * idx;
  });

  // 2. Find current section interval
  let prevIdx = 0;
  let nextIdx = sectionsConfig.length - 1;

  for (let i = 0; i < offsets.length - 1; i++) {
    if (scrollY >= offsets[i] && scrollY <= offsets[i + 1]) {
      prevIdx = i;
      nextIdx = i + 1;
      break;
    }
  }

  // 3. Calculate interpolation factor
  const prevOffset = offsets[prevIdx];
  const nextOffset = offsets[nextIdx];
  const range = nextOffset - prevOffset;
  const t = range === 0 ? 0 : (scrollY - prevOffset) / range;
  const easedT = t * t * (3 - 2 * t); // Smoothstep

  const lerp = (a: number, b: number) => a + (b - a) * easedT;

  const prevVals = sectionsConfig[prevIdx].values;
  const nextVals = sectionsConfig[nextIdx].values;

  return {
    x: lerp(prevVals.x, nextVals.x),
    y: lerp(prevVals.y, nextVals.y),
    z: lerp(prevVals.z, nextVals.z),
    rx: lerp(prevVals.rx, nextVals.rx),
    ry: lerp(prevVals.ry, nextVals.ry),
    rz: lerp(prevVals.rz, nextVals.rz),
    scale: lerp(prevVals.scale, nextVals.scale),
    starOffset: lerp(prevVals.starOffset, nextVals.starOffset),
    opacity: lerp(prevVals.opacity, nextVals.opacity),
  };
}
