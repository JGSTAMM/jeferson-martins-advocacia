'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ConstitutionalScene3DProps {
  variant?: 'hero' | 'bio';
  className?: string;
}

export function ConstitutionalScene3D({
  variant = 'hero',
  className = '',
}: ConstitutionalScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const isDesktop = window.innerWidth >= 768;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, isDesktop ? 6.0 : 6.8);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isDesktop ? 2 : 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xf6f3ec, 0.7);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xc8a25a, 32, 28);
    goldLight.position.set(3.2, 3.0, 4.5);
    scene.add(goldLight);

    const crimsonLight = new THREE.PointLight(0x8c1d24, 24, 25);
    crimsonLight.position.set(-3.5, -2.5, 3.5);
    scene.add(crimsonLight);

    // Group positioning: offset right on desktop hero, centered on bio/mobile
    const sculptureGroup = new THREE.Group();
    const basePosX = variant === 'hero' && isDesktop ? 1.15 : 0;
    const basePosY = variant === 'hero' && isDesktop ? 0.1 : 0.18;
    sculptureGroup.position.set(basePosX, basePosY, 0);
    scene.add(sculptureGroup);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc8a25a,
      metalness: 0.88,
      roughness: 0.22,
    });

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0x9b7a3d,
      metalness: 0.82,
      roughness: 0.28,
    });

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x7a181f,
      metalness: 0.42,
      roughness: 0.2,
      emissive: 0x3d0a0e,
      emissiveIntensity: 0.75,
      flatShading: true,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xe5ca91,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [goldMat, bronzeMat, coreMat, wireMat];

    // Core crystalline icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(variant === 'bio' ? 0.75 : 0.92, 0);
    geometries.push(coreGeo);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    const wireGeo = new THREE.IcosahedronGeometry(variant === 'bio' ? 1.02 : 1.25, 1);
    geometries.push(wireGeo);
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sculptureGroup.add(wireMesh);

    // Outer constitutional astrolabe rings
    const ring1Geo = new THREE.TorusGeometry(
      variant === 'bio' ? 1.42 : 1.75,
      0.028,
      16,
      isDesktop ? 100 : 64,
    );
    geometries.push(ring1Geo);
    const ring1 = new THREE.Mesh(ring1Geo, goldMat);
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(
      variant === 'bio' ? 1.75 : 2.15,
      0.022,
      16,
      isDesktop ? 100 : 64,
    );
    geometries.push(ring2Geo);
    const ring2 = new THREE.Mesh(ring2Geo, bronzeMat);
    ring2.rotation.y = Math.PI / 4;
    sculptureGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(
      variant === 'bio' ? 2.05 : 2.52,
      0.016,
      14,
      isDesktop ? 110 : 70,
    );
    geometries.push(ring3Geo);
    const ring3 = new THREE.Mesh(ring3Geo, goldMat);
    ring3.rotation.z = Math.PI / 5;
    ring3.rotation.x = -Math.PI / 5;
    sculptureGroup.add(ring3);

    // Floating gold dust particles
    const particleCount = isDesktop ? 220 : 90;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.0 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometries.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d99f,
      size: isDesktop ? 0.038 : 0.045,
      transparent: true,
      opacity: 0.75,
    });
    materials.push(particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    sculptureGroup.add(particles);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollFactor = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      targetMouseX = (clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollFactor = Math.min(window.scrollY / 900, 1.5);
    };

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Continuous requestAnimationFrame animation loop (never blocked by accessibility)
    const motionMultiplier = prefersReducedMotion ? 0.45 : 1.0;
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse easing
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      // Vertical breathing levitation
      sculptureGroup.position.y =
        basePosY + Math.sin(elapsed * 1.5 * motionMultiplier) * 0.12;

      // Core rotation
      coreMesh.rotation.y = elapsed * 0.52 * motionMultiplier + currentMouseX * 0.55;
      coreMesh.rotation.x = elapsed * 0.32 * motionMultiplier + currentMouseY * 0.42;

      // Wireframe counter-rotation
      wireMesh.rotation.y = -elapsed * 0.38 * motionMultiplier;
      wireMesh.rotation.z = elapsed * 0.22 * motionMultiplier;

      // Orbital rings dynamic precession
      ring1.rotation.z = elapsed * 0.42 * motionMultiplier;
      ring1.rotation.x =
        Math.PI / 3 +
        Math.sin(elapsed * 0.7 * motionMultiplier) * 0.18 +
        currentMouseY * 0.35 +
        scrollFactor * 0.3;

      ring2.rotation.x = -elapsed * 0.36 * motionMultiplier;
      ring2.rotation.y =
        Math.PI / 4 +
        Math.cos(elapsed * 0.65 * motionMultiplier) * 0.2 +
        currentMouseX * 0.4;

      ring3.rotation.y = elapsed * 0.28 * motionMultiplier;
      ring3.rotation.z =
        Math.PI / 5 +
        Math.sin(elapsed * 0.55 * motionMultiplier) * 0.2 +
        scrollFactor * 0.45;

      // Particle field drift
      particles.rotation.y = elapsed * 0.1 * motionMultiplier + currentMouseX * 0.15;
      particles.rotation.x = Math.sin(elapsed * 0.4 * motionMultiplier) * 0.08;

      // Group interaction tilt
      sculptureGroup.rotation.y = currentMouseX * 0.32;
      sculptureGroup.rotation.x =
        -currentMouseY * 0.24 - scrollFactor * 0.22;

      // Dynamic moving specular highlights
      goldLight.position.x =
        3.2 + currentMouseX * 2.8 + Math.sin(elapsed * 0.9 * motionMultiplier) * 0.8;
      goldLight.position.y =
        3.0 - currentMouseY * 2.0 + Math.cos(elapsed * 0.8 * motionMultiplier) * 0.6;

      crimsonLight.position.x = -3.5 - currentMouseX * 1.8;
      crimsonLight.position.y = -2.5 + currentMouseY * 1.5;

      renderer?.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
    };
  }, [variant]);

  if (webglFailed) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div className="absolute right-[-10%] top-[12%] h-72 w-72 rounded-full border border-gold/25 bg-radial from-crimson/25 via-transparent to-transparent blur-xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}
