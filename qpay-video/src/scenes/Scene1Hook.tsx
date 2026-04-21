import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { GoldParticles, GoldLightRay, FilmGrain } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const flashOpacity = interpolate(
    frame,
    [24 * FPS - 3, 24 * FPS, 24 * FPS + 3],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <SceneBase bg={COLORS.bgDark} dark>
      <GoldLightRay />
      <GoldParticles count={60} />
      <FilmGrain />

      {/* Giant faded question mark */}
      <div
        style={{
          position: 'absolute',
          right: -60,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 600,
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 900,
          color: COLORS.white,
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        ؟
      </div>

      {/* Kinetic text stack — centered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: '0 120px',
          textAlign: 'center',
        }}
      >
        <AnimText
          text="تشتري الآن..."
          delayFrames={ms(400)}
          animation="fadeUp"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 80,
            color: COLORS.white,
            lineHeight: 1.2,
          }}
        />
        <AnimText
          text="وتدفع لاحقاً؟"
          delayFrames={ms(1100)}
          animation="fadeUp"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 64,
            color: COLORS.white,
            lineHeight: 1.2,
          }}
        />
        <AnimText
          text="بدون بطاقة ائتمان"
          delayFrames={ms(1800)}
          animation="fadeUp"
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 400,
            fontSize: 36,
            color: COLORS.greyMuted,
          }}
        />
        <AnimText
          text="بدون فوائد"
          delayFrames={ms(2500)}
          animation="popScale"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 80,
            color: COLORS.gold,
          }}
        />
        <AnimText
          text="نعم — ممكن"
          delayFrames={ms(3200)}
          animation="fadeUp"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 64,
            color: COLORS.white,
          }}
        />
        <AnimText
          text="في عُمان. الآن. مجاناً."
          delayFrames={ms(3900)}
          animation="fadeUp"
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 300,
            fontSize: 32,
            color: COLORS.greyMuted,
          }}
        />

        {/* FLTR.OM branding */}
        <AnimText
          text="FLTR.OM"
          delayFrames={ms(4500)}
          animation="fade"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 20,
            color: COLORS.gold,
            letterSpacing: '0.3em',
            marginTop: 16,
            direction: 'ltr',
          }}
        />
      </div>

      {/* Flash transition to white */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#FFFFFF',
          opacity: flashOpacity,
          pointerEvents: 'none',
        }}
      />
    </SceneBase>
  );
};
