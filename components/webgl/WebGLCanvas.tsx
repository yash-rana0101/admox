'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScroll, useSpring } from 'framer-motion';
import { interpolateSections } from './WebGLConfig';

export function WebGLCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activePillarRef = useRef<number>(-1);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handlePillarHover = (e: Event) => {
      const customEvent = e as CustomEvent;
      activePillarRef.current = customEvent.detail;
    };
    window.addEventListener('webgl-pillar-hover', handlePillarHover);
    return () => {
      window.removeEventListener('webgl-pillar-hover', handlePillarHover);
    };
  }, []);
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

    // Running WebGL sync variables for Pillars
    let currentSpeedMult = 1.0;
    let currentEmissiveInt = 1.2;
    let currentScaleOffset = 0.0;
    let currentOscillateZ = 0.0;
    let currentStarOffsetBonus = 0.0;

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

      // Calculate dynamic WebGL targets based on the active hovered pillar index
      let targetSpeedMult = 1.0;
      let targetEmissiveInt = 1.2;
      let targetScaleOffset = 0.0;
      let targetOscillateZ = 0.0;
      let targetStarOffsetBonus = 0.0;

      const activePillar = activePillarRef.current;
      if (activePillar === 0) { // Creativity
        targetSpeedMult = 1.8;
        targetStarOffsetBonus = 0.15; // float star further out
      } else if (activePillar === 1) { // Innovation
        targetSpeedMult = 3.8; // spin very fast
        targetEmissiveInt = 4.0; // intense teal glow
      } else if (activePillar === 2) { // Performance
        targetSpeedMult = 0.4; // slow deliberate spin
        targetScaleOffset = 0.18; // pulse bigger
      } else if (activePillar === 3) { // Storytelling
        targetOscillateZ = Math.sin(Date.now() * 0.003) * 0.18; // wavy Z-axis rock
      } else if (activePillar === 4) { // Growth
        targetSpeedMult = 2.4;
        targetScaleOffset = 0.08;
      }

      // Smoothly interpolate current values towards targets
      currentSpeedMult = THREE.MathUtils.lerp(currentSpeedMult, targetSpeedMult, 0.08);
      currentEmissiveInt = THREE.MathUtils.lerp(currentEmissiveInt, targetEmissiveInt, 0.08);
      currentScaleOffset = THREE.MathUtils.lerp(currentScaleOffset, targetScaleOffset, 0.08);
      currentOscillateZ = THREE.MathUtils.lerp(currentOscillateZ, targetOscillateZ, 0.08);
      currentStarOffsetBonus = THREE.MathUtils.lerp(currentStarOffsetBonus, targetStarOffsetBonus, 0.08);

      // 3D Group transformations
      mainGroup.position.x = THREE.MathUtils.lerp(mainGroup.position.x, targetX, 0.08);
      mainGroup.position.y = THREE.MathUtils.lerp(mainGroup.position.y, targetY, 0.08);
      mainGroup.position.z = THREE.MathUtils.lerp(mainGroup.position.z, interpolated.z, 0.08);

      const targetRx = interpolated.rx + mouseRef.current.y * 0.25;
      const targetRy = interpolated.ry + mouseRef.current.x * 0.25;
      mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, targetRx, 0.08);
      mainGroup.rotation.y = THREE.MathUtils.lerp(mainGroup.rotation.y, targetRy, 0.08);
      
      // Apply base Z rotation plus any active storytelling wave oscillation
      mainGroup.rotation.z = THREE.MathUtils.lerp(mainGroup.rotation.z, interpolated.rz + currentOscillateZ, 0.08);

      // Apply base scale plus active scale pulse offset
      const finalScale = targetScale + currentScaleOffset;
      mainGroup.scale.setScalar(THREE.MathUtils.lerp(mainGroup.scale.x, finalScale, 0.08));

      // Separate the star from the chevron base on scroll + active hover bonus
      starMesh.position.y = THREE.MathUtils.lerp(
        starMesh.position.y,
        -0.3 - interpolated.starOffset - currentStarOffsetBonus,
        0.08
      );
      // Spin the star based on scroll progress and active speed multiplier
      starMesh.rotation.y += (0.01 + interpolated.starOffset * 0.03) * currentSpeedMult;

      // Apply opacity & dynamic teal emission intensity
      chevronMat.opacity = THREE.MathUtils.lerp(chevronMat.opacity, interpolated.opacity, 0.08);
      starMat.opacity = THREE.MathUtils.lerp(starMat.opacity, interpolated.opacity, 0.08);
      starMat.emissiveIntensity = THREE.MathUtils.lerp(starMat.emissiveIntensity, currentEmissiveInt * interpolated.opacity, 0.08);
      pointLight.intensity = THREE.MathUtils.lerp(pointLight.intensity, interpolated.opacity * currentEmissiveInt * 6.0, 0.08);

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
