'use client';

import { useRef, useState, type MouseEvent } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard3D({
  children,
  className = '',
  intensity = 10,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState(
    'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  );
  const [spot, setSpot] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const rotateY = ((x / rect.width) - 0.5) * intensity * 2;
    const rotateX = -((y / rect.height) - 0.5) * intensity * 2;

    if (!isHovered) setIsHovered(true);
    setTransform(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
    );
    setSpot({ x: percentX, y: percentY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform(
      'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    );
    setSpot((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`preserve-3d relative transition-transform active:scale-[0.985] ${
        isHovered ? 'duration-75 ease-linear' : 'duration-300 ease-out'
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: spot.opacity,
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(200, 162, 90, 0.16), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
