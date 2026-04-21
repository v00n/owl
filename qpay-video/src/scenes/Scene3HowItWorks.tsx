import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { FilmGrain, GoldLightRay } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const paymentSteps = [
  { pct: '٢٥٪', label: 'الدفعة الأولى', delay: ms(1800) },
  { pct: '٢٥٪', label: 'الشهر الأول', delay: ms(2000) },
  { pct: '٢٥٪', label: 'الشهر الثاني', delay: ms(2200) },
  { pct: '٢٥٪', label: 'الشهر الثالث', delay: ms(2400) },
];

const PaymentCard: React.FC<{ pct: string; label: string; delayFrames: number; index: number }> = ({
  pct, label, delayFrames, index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delayFrames);
  const s = spring({ frame: localFrame, fps, config: { damping: 16, stiffness: 200, mass: 0.8 } });
  const translateY = interpolate(s, [0, 1], [40, 0]);
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        direction: 'ltr',
      }}
    >
      {index > 0 && (
        <div
          style={{
            fontSize: 24,
            color: COLORS.gold,
            opacity: 0.8,
            margin: '0 8px',
          }}
        >
          ←
        </div>
      )}
      <div
        style={{
          border: `2px solid ${COLORS.gold}`,
          borderRadius: 16,
          padding: '20px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(201,168,76,0.06)',
          minWidth: 160,
        }}
      >
        <span
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 36,
            color: COLORS.gold,
            direction: 'rtl',
          }}
        >
          {pct}
        </span>
        <span
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 500,
            fontSize: 16,
            color: COLORS.white,
            direction: 'rtl',
            textAlign: 'center',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const Scene3HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneBase bg={COLORS.bgDark3} dark>
      <FilmGrain />
      <GoldLightRay />

      {/* Giant faded ٤ */}
      <div
        style={{
          position: 'absolute',
          bottom: -80,
          right: -40,
          fontSize: 500,
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 900,
          color: COLORS.white,
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none',
          direction: 'ltr',
        }}
      >
        ٤
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '0 80px',
        }}
      >
        {/* Section label */}
        <AnimText
          text="— كيف يعمل QPay؟"
          delayFrames={ms(200)}
          animation="fade"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 16,
            color: COLORS.gold,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        />

        {/* Main headline */}
        <div style={{ textAlign: 'center' }}>
          <AnimText
            text="اشترِ أي منتج"
            delayFrames={ms(600)}
            animation="fadeUp"
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 900,
              fontSize: 68,
              color: COLORS.white,
              lineHeight: 1.1,
            }}
          />
          <AnimText
            text="قسّم الدفع"
            delayFrames={ms(1000)}
            animation="popScale"
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 900,
              fontSize: 76,
              color: COLORS.gold,
              lineHeight: 1.1,
            }}
          />
          <AnimText
            text="على ٤ أشهر"
            delayFrames={ms(1400)}
            animation="fadeUp"
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 900,
              fontSize: 68,
              color: COLORS.red,
              lineHeight: 1.1,
            }}
          />
        </div>

        {/* 4-step payment cards row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 4,
            marginTop: 16,
          }}
        >
          {paymentSteps.map((step, i) => (
            <PaymentCard
              key={i}
              pct={step.pct}
              label={step.label}
              delayFrames={step.delay}
              index={i}
            />
          ))}
        </div>

        {/* Zero interest closing line */}
        <AnimText
          text="الإجمالي؟ ٠٪ فوائد"
          delayFrames={ms(3200)}
          animation="popScale"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 52,
            color: COLORS.white,
            marginTop: 8,
          }}
        />
      </div>
    </SceneBase>
  );
};
