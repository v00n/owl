import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { DotGrid } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const bulletPoints = [
  { text: 'مُرخّص رسمياً من البنك المركزي العُماني', delay: ms(1300) },
  { text: 'متوافق مع أحكام الشريعة الإسلامية', delay: ms(1600) },
  { text: 'تأسس عام ٢٠٢٢ — ويتوسع بسرعة', delay: ms(1900) },
  { text: 'بدعم من Future Fund Oman', delay: ms(2200) },
];

const AppIconMockup: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delay);
  const { fps } = useVideoConfig();

  const s = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 180, mass: 1 } });
  const translateX = interpolate(s, [0, 1], [-80, 0]);
  const opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const glowPulse = 0.6 + Math.sin(frame * 0.08) * 0.2;

  return (
    <div
      style={{
        transform: `translateX(${translateX}px)`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      {/* App icon */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: -20,
            borderRadius: 36,
            background: `radial-gradient(circle, ${COLORS.gold}66 0%, transparent 70%)`,
            opacity: glowPulse,
          }}
        />
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 32,
            background: '#111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${COLORS.gold}66`,
            boxShadow: `0 8px 40px ${COLORS.gold}33`,
            position: 'relative',
          }}
        >
          <span
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 900,
              fontSize: 42,
              color: '#1A9BD7',
            }}
          >
            Q
          </span>
          <span
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 400,
              fontSize: 28,
              color: '#1A9BD7',
              marginTop: 8,
            }}
          >
            pay
          </span>
        </div>
      </div>

      {/* Verified badge */}
      <div
        style={{
          background: '#E8F5E9',
          border: '1px solid #A5D6A7',
          borderRadius: 20,
          padding: '6px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          direction: 'rtl',
        }}
      >
        <span style={{ fontSize: 14, color: '#2E7D32', fontFamily: '"Tajawal", sans-serif' }}>
          ✓ معتمد من البنك المركزي
        </span>
      </div>
    </div>
  );
};

export const Scene2WhatIsQPay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneBase bg={COLORS.bgLight} dark={false}>
      <DotGrid />

      {/* Soft grey swoosh bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: '#E0E0DC',
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0 100px',
          gap: 80,
        }}
      >
        {/* Left — App icon */}
        <div style={{ flex: '0 0 320px', display: 'flex', justifyContent: 'center' }}>
          <AppIconMockup delay={ms(300)} />
        </div>

        {/* Right — Text content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            direction: 'rtl',
          }}
        >
          {/* Gold tag */}
          <AnimText
            text="أول منصة BNPL في عُمان"
            delayFrames={ms(200)}
            animation="fadeUp"
            style={{
              display: 'inline-block',
              background: COLORS.gold,
              color: '#000',
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: 700,
              fontSize: 16,
              padding: '4px 16px',
              borderRadius: 20,
              width: 'fit-content',
            }}
          />

          <AnimText
            text="ما هو QPay؟"
            delayFrames={ms(500)}
            animation="fadeUp"
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 900,
              fontSize: 76,
              color: '#111',
              lineHeight: 1.1,
            }}
          />

          <AnimText
            text="تطبيق عُماني يُتيح لك شراء ما تريد وتقسيم الدفع على أقساط شهرية مريحة"
            delayFrames={ms(900)}
            animation="fadeUp"
            style={{
              fontFamily: '"Tajawal", sans-serif',
              fontWeight: 400,
              fontSize: 28,
              color: '#444',
              lineHeight: 1.5,
              maxWidth: 620,
            }}
          />

          {/* Bullet list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            {bulletPoints.map((b, i) => (
              <BulletItem key={i} text={b.text} delayFrames={b.delay} />
            ))}
          </div>
        </div>
      </div>
    </SceneBase>
  );
};

const BulletItem: React.FC<{ text: string; delayFrames: number }> = ({ text, delayFrames }) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delayFrames);
  const opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const translateX = interpolate(localFrame, [0, 18], [-30, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        direction: 'rtl',
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: COLORS.gold,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: '"Tajawal", sans-serif',
          fontWeight: 500,
          fontSize: 22,
          color: '#222',
        }}
      >
        {text}
      </span>
    </div>
  );
};
