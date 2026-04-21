import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { GoldParticles, GoldRadialBurst, PulsingRings } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const ytBadges = [
  { icon: '👍', text: 'أعجبك الفيديو؟ لايك',           delay: ms(2400) },
  { icon: '🔔', text: 'اشترك وفعّل الجرس',             delay: ms(2500) },
  { icon: '💬', text: 'اكتب سؤالك في التعليقات',       delay: ms(2600) },
  { icon: '↗️', text: 'شاركه مع أهلك وأصدقائك',        delay: ms(2700) },
];

const YTBadge: React.FC<{ icon: string; text: string; delayFrames: number }> = ({
  icon, text, delayFrames,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delayFrames);
  const opacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const translateY = interpolate(localFrame, [0, 15], [16, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 32,
        padding: '10px 20px',
        direction: 'rtl',
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span
        style={{
          fontFamily: '"Tajawal", sans-serif',
          fontWeight: 500,
          fontSize: 16,
          color: COLORS.white,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const CTAButton: React.FC<{ text: string; variant: 'filled' | 'outline'; delayFrames: number }> = ({
  text, variant, delayFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delayFrames);
  const s = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 200, mass: 0.8 } });
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        background: variant === 'filled' ? COLORS.gold : 'transparent',
        border: `2px solid ${variant === 'filled' ? COLORS.gold : COLORS.white}`,
        borderRadius: 40,
        padding: '14px 40px',
        fontFamily: '"Cairo", sans-serif',
        fontWeight: 700,
        fontSize: 18,
        color: variant === 'filled' ? '#000' : COLORS.white,
        cursor: 'default',
        direction: 'ltr',
      }}
    >
      {text}
    </div>
  );
};

export const Scene9CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeOutOpacity = interpolate(
    frame,
    [34 * FPS, 38 * FPS],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) }
  );

  return (
    <SceneBase bg={COLORS.bgDark} dark>
      <GoldRadialBurst />
      <PulsingRings />
      <GoldParticles count={60} />

      {/* Giant faded FLTR */}
      <div
        style={{
          position: 'absolute',
          bottom: -40,
          left: -20,
          fontSize: 260,
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 900,
          color: COLORS.white,
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none',
          direction: 'ltr',
        }}
      >
        FLTR
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          padding: '0 120px',
          textAlign: 'center',
          opacity: fadeOutOpacity,
        }}
      >
        <AnimText
          text="✦ FLTR.OM ✦"
          delayFrames={ms(300)}
          animation="fade"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 18,
            color: COLORS.gold,
            letterSpacing: '0.3em',
            direction: 'ltr',
          }}
        />

        <AnimText
          text="الآن تعرف كل شيء"
          delayFrames={ms(700)}
          animation="fadeUp"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 76,
            color: COLORS.white,
            lineHeight: 1.1,
          }}
        />

        <AnimText
          text="عن QPay"
          delayFrames={ms(1100)}
          animation="popScale"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 84,
            color: COLORS.gold,
            lineHeight: 1,
          }}
        />

        <AnimText
          text="حمّل التطبيق الآن وجرّب بنفسك"
          delayFrames={ms(1500)}
          animation="fadeUp"
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 400,
            fontSize: 32,
            color: COLORS.greyMuted,
            marginTop: 8,
          }}
        />

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            marginTop: 8,
            direction: 'ltr',
          }}
        >
          <CTAButton text="App Store" variant="filled" delayFrames={ms(1900)} />
          <CTAButton text="Google Play" variant="outline" delayFrames={ms(1900)} />
        </div>

        {/* YouTube badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          {ytBadges.map((b, i) => (
            <YTBadge key={i} icon={b.icon} text={b.text} delayFrames={b.delay} />
          ))}
        </div>
      </div>
    </SceneBase>
  );
};
