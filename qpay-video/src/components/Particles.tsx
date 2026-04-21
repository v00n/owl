import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../constants';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const GoldParticles: React.FC<{ count?: number }> = ({ count = 60 }) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    x: seededRandom(i * 7.1) * 100,
    y: seededRandom(i * 3.3) * 100,
    size: seededRandom(i * 5.7) * 4 + 1,
    speed: seededRandom(i * 2.9) * 0.03 + 0.01,
    opacity: seededRandom(i * 4.1) * 0.5 + 0.1,
    delay: seededRandom(i * 6.3) * 100,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => {
        const t = (frame + p.delay) * p.speed;
        const y = ((p.y + t * 30) % 110) - 5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: COLORS.gold,
              opacity: p.opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export const GoldLightRay: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(frame / 30, 0.18);

  return (
    <div
      style={{
        position: 'absolute',
        top: -200,
        left: -200,
        width: 800,
        height: 800,
        background: `radial-gradient(ellipse at 20% 20%, ${COLORS.gold}44 0%, transparent 70%)`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

export const GoldRadialBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(frame / 30, 0.14);
  const scale = 1 + Math.sin(frame * 0.04) * 0.03;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.gold}33 0%, transparent 65%)`,
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
};

export const PulsingRings: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {[300, 480, 660].map((size, i) => {
        const pulse = Math.sin((frame * 0.05) + i * 1.2) * 0.15 + 0.85;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1px solid ${COLORS.gold}`,
              opacity: (0.15 - i * 0.04) * pulse,
              transform: `scale(${pulse})`,
            }}
          />
        );
      })}
    </div>
  );
};

export const FilmGrain: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
      opacity: 0.25,
      pointerEvents: 'none',
    }}
  />
);

export const DotGrid: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(circle, #00000022 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      opacity: 0.12,
      pointerEvents: 'none',
    }}
  />
);
