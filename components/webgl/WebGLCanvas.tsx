'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScroll, useSpring } from 'framer-motion';

interface KeyframeValues {
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

interface SectionKeyframe {
  id: string;
  values: KeyframeValues;
}

const sectionsConfig: SectionKeyframe[] = [
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

function interpolateSections(scrollY: number): KeyframeValues {
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

export function WebGLCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = smoothScroll.on("change", (latest) => {
      scrollRef.current = latest;
    });
    return () => unsubscribe();
  }, [smoothScroll]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene, Camera, Renderer
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);

    // 2. Geometries (Chevron "A" & Sparkle)
    const chevronShape = new THREE.Shape();
    chevronShape.moveTo(-1.0, -0.8);
    chevronShape.lineTo(0.0, 1.0);
    chevronShape.lineTo(1.0, -0.8);
    chevronShape.lineTo(0.6, -0.8);
    chevronShape.lineTo(0.0, 0.35);
    chevronShape.lineTo(-0.6, -0.8);
    chevronShape.closePath();

    const chevronGeo = new THREE.ExtrudeGeometry(chevronShape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    chevronGeo.center();

    const starShape = new THREE.Shape();
    const r = 0.16;
    const R = 0.55;
    starShape.moveTo(0, R);
    starShape.lineTo(r, r);
    starShape.lineTo(R, 0);
    starShape.lineTo(r, -r);
    starShape.lineTo(0, -R);
    starShape.lineTo(-r, -r);
    starShape.lineTo(-R, 0);
    starShape.lineTo(-r, r);
    starShape.closePath();

    const starGeo = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    starGeo.center();

    // 3. Materials
    const chevronMat = new THREE.MeshPhysicalMaterial({
      color: 0x252f2c, // Onyx Black
      roughness: 0.15,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 1.0,
    });

    const starMat = new THREE.MeshPhysicalMaterial({
      color: 0x256951, // Ocean Teal
      emissive: 0x256951,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 0.4,
      transparent: true,
      opacity: 1.0,
    });

    // 4. Create Group & Meshes
    const mainGroup = new THREE.Group();
    const chevronMesh = new THREE.Mesh(chevronGeo, chevronMat);
    const starMesh = new THREE.Mesh(starGeo, starMat);

    // Position star at the base of the Chevron A
    starMesh.position.y = -0.3;
    starMesh.position.z = 0.1;

    mainGroup.add(chevronMesh);
    mainGroup.add(starMesh);
    scene.add(mainGroup);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4e8cc, 0.8);
    dirLight2.position.set(-5, 3, 2);
    scene.add(dirLight2);

    // Glowing Point Light inside the star
    const pointLight = new THREE.PointLight(0x256951, 8.0, 6);
    pointLight.position.set(0, -0.3, 0.25);
    mainGroup.add(pointLight);

    // 6. Handle Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;

    const tick = () => {
      // Calculate smooth pixel scroll position using our useSpring motion value
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const smoothScrollY = scrollRef.current * (totalScrollHeight > 0 ? totalScrollHeight : 1);

      const interpolated = interpolateSections(smoothScrollY);
      const isMobile = window.innerWidth < 768;

      // Adjust positions and sizes dynamically based on responsive rules
      let targetX = interpolated.x;
      let targetY = interpolated.y;
      let targetScale = interpolated.scale;

      if (isMobile) {
        targetX = 0; // Centered
        targetY = interpolated.y * 0.9;
        targetScale = interpolated.scale * 0.65;
      }

      // 3D Group transformations
      mainGroup.position.x = THREE.MathUtils.lerp(mainGroup.position.x, targetX, 0.08);
      mainGroup.position.y = THREE.MathUtils.lerp(mainGroup.position.y, targetY, 0.08);
      mainGroup.position.z = THREE.MathUtils.lerp(mainGroup.position.z, interpolated.z, 0.08);

      const targetRx = interpolated.rx + mouseRef.current.y * 0.25;
      const targetRy = interpolated.ry + mouseRef.current.x * 0.25;
      mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, targetRx, 0.08);
      mainGroup.rotation.y = THREE.MathUtils.lerp(mainGroup.rotation.y, targetRy, 0.08);
      mainGroup.rotation.z = THREE.MathUtils.lerp(mainGroup.rotation.z, interpolated.rz, 0.08);

      mainGroup.scale.setScalar(THREE.MathUtils.lerp(mainGroup.scale.x, targetScale, 0.08));

      // Separate the star from the chevron base on scroll for custom parallax effect
      starMesh.position.y = THREE.MathUtils.lerp(
        starMesh.position.y,
        -0.3 - interpolated.starOffset,
        0.08
      );
      // Spin the star faster if it separates
      starMesh.rotation.y += 0.01 + interpolated.starOffset * 0.03;

      // Apply opacity interpolation
      chevronMat.opacity = THREE.MathUtils.lerp(chevronMat.opacity, interpolated.opacity, 0.08);
      starMat.opacity = THREE.MathUtils.lerp(starMat.opacity, interpolated.opacity, 0.08);
      pointLight.intensity = THREE.MathUtils.lerp(pointLight.intensity, interpolated.opacity * 8.0, 0.08);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      chevronGeo.dispose();
      starGeo.dispose();
      chevronMat.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen pointer-events-none webgl-container" />;
}
