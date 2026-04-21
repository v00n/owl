import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { DotGrid } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const requirements = [
  {
    icon: '🪪',
    title: 'رقم الهوية العُمانية أو الإقامة',
    sub: 'الرقم المدني المسجل',
    delay: ms(600),
  },
  {
    icon: '📱',
    title: 'رقم هاتف عُماني فعّال',
    sub: 'لاستقبال رمز التحقق OTP',
    delay: ms(950),
  },
  {
    icon: '🤳',
    title: 'صورة واضحة للوجه',
    sub: 'التحقق البيومتري — إضاءة جيدة ضرورية',
    delay: ms(1300),
  },
  {
    icon: '💳',
    title: 'بطاقة خصم من بنك عُماني',
    sub: 'بنك مسقط، عُمان العربي، وغيرها',
    delay: ms(1650),
  },
];

const RequirementRow: React.FC<{
  icon: string; title: string; sub: string; delayFrames: number;
}> = ({ icon, title, sub, delayFrames }) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delayFrames);
  const opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const translateX = interpolate(localFrame, [0, 18], [50, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        direction: 'rtl',
        background: 'rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: '18px 24px',
      }}
    >
      <span style={{ fontSize: 36, flexShrink: 0 }}>{icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 22,
            color: '#111',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 400,
            fontSize: 16,
            color: COLORS.greyMuted,
          }}
        >
          {sub}
        </span>
      </div>
    </div>
  );
};

const PhoneMockup: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);
  const s = spring({ frame: localFrame, fps, config: { damping: 16, stiffness: 160, mass: 1.2 } });
  const translateY = interpolate(s, [0, 1], [60, 0]);
  const opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        position: 'relative',
      }}
    >
      {/* Phone body */}
      <div
        style={{
          width: 240,
          height: 480,
          background: '#111',
          borderRadius: 36,
          border: '6px solid #333',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          padding: 24,
          overflow: 'hidden',
        }}
      >
        {/* Screen content */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: `3px dashed ${COLORS.gold}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🤳
          </div>
          <span
            style={{
              fontFamily: '"Tajawal", sans-serif',
              fontSize: 13,
              color: '#ccc',
              textAlign: 'center',
              direction: 'rtl',
            }}
          >
            التحقق من الهوية
          </span>
          <div
            style={{
              width: '80%',
              height: 36,
              borderRadius: 18,
              background: '#1A9BD7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 13, fontFamily: '"Tajawal", sans-serif' }}>
              ابدأ التسجيل
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene4Requirements: React.FC = () => {
  return (
    <SceneBase bg={COLORS.bgLight} dark={false}>
      <DotGrid />

      {/* Giant faded ٠١ */}
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: -20,
          fontSize: 400,
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 900,
          color: '#000',
          opacity: 0.05,
          lineHeight: 1,
          userSelect: 'none',
          direction: 'ltr',
        }}
      >
        ٠١
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
        {/* Left — Phone mockup */}
        <div style={{ flex: '0 0 280px', display: 'flex', justifyContent: 'center' }}>
          <PhoneMockup delay={ms(400)} />
        </div>

        {/* Right — Requirements */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            direction: 'rtl',
          }}
        >
          <AnimText
            text="ماذا تحتاج للتسجيل؟"
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

          {requirements.map((r, i) => (
            <RequirementRow
              key={i}
              icon={r.icon}
              title={r.title}
              sub={r.sub}
              delayFrames={r.delay}
            />
          ))}
        </div>
      </div>
    </SceneBase>
  );
};
