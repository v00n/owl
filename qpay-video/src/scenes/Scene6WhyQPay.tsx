import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { DotGrid } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const stats = [
  { number: '٠٪',   label: 'فوائد على الإطلاق',    delay: ms(400) },
  { number: '٤',    label: 'أقساط شهرية مريحة',    delay: ms(700) },
  { number: '٢٠٢٢', label: 'أول BNPL في عُمان',    delay: ms(1000) },
];

const reasons = [
  { title: 'مرخّص رسمياً من البنك المركزي العُماني', sub: 'أمانك مضمون تحت رقابة حكومية كاملة', delay: ms(600) },
  { title: 'متوافق ١٠٠٪ مع الشريعة الإسلامية', sub: 'لجنة شرعية مستقلة تُشرف على كل المنتجات', delay: ms(950) },
  { title: 'لا رسوم خفية — لا فوائد — أبداً', sub: 'المتاجر تدفع العمولة، ليس أنت', delay: ms(1300) },
  { title: 'مرونة: ٢ أو ٣ أو ٤ أقساط', sub: 'اختر ما يناسب راتبك وجدولك', delay: ms(1650) },
];

const StatCard: React.FC<{ number: string; label: string; delayFrames: number }> = ({ number, label, delayFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delayFrames);
  const s = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 180, mass: 1 } });
  const translateY = interpolate(s, [0, 1], [40, 0]);
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        background: '#111',
        borderRadius: 20,
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 6,
        direction: 'rtl',
        width: 240,
      }}
    >
      <span
        style={{
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 900,
          fontSize: 52,
          color: COLORS.gold,
          lineHeight: 1,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily: '"Tajawal", sans-serif',
          fontWeight: 500,
          fontSize: 16,
          color: COLORS.greyMuted,
          textAlign: 'right',
        }}
      >
        {label}
      </span>
    </div>
  );
};

const ReasonRow: React.FC<{ title: string; sub: string; delayFrames: number }> = ({ title, sub, delayFrames }) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delayFrames);
  const opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const translateX = interpolate(localFrame, [0, 18], [40, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        direction: 'rtl',
      }}
    >
      {/* Gold circle checkmark */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: COLORS.gold,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <span style={{ color: '#000', fontSize: 14, fontWeight: 900 }}>✓</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 20,
            color: '#111',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 400,
            fontSize: 15,
            color: COLORS.greyMuted,
          }}
        >
          {sub}
        </span>
      </div>
    </div>
  );
};

export const Scene6WhyQPay: React.FC = () => {
  return (
    <SceneBase bg={COLORS.bgLight} dark={false}>
      <DotGrid />

      {/* Giant faded WHY? */}
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: -40,
          fontSize: 300,
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 900,
          color: '#000',
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none',
          direction: 'ltr',
        }}
      >
        WHY?
      </div>

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
        {/* Left — Stat cards */}
        <div
          style={{
            flex: '0 0 280px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {stats.map((s, i) => (
            <StatCard key={i} number={s.number} label={s.label} delayFrames={s.delay} />
          ))}
        </div>

        {/* Right — Reasons */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            direction: 'rtl',
          }}
        >
          <AnimText
            text="لماذا تختار QPay؟"
            delayFrames={ms(200)}
            animation="fadeUp"
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 900,
              fontSize: 64,
              color: '#111',
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          />

          {reasons.map((r, i) => (
            <ReasonRow key={i} title={r.title} sub={r.sub} delayFrames={r.delay} />
          ))}
        </div>
      </div>
    </SceneBase>
  );
};
