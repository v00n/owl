import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { GoldLightRay } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const steps = [
  { num: '١', icon: '📲', title: 'حمّل التطبيق',       desc: 'App Store أو Google Play', highlighted: true,  delay: ms(500)  },
  { num: '٢', icon: '🪪', title: 'أدخل هويتك',         desc: 'رقم الهوية العُمانية أو الإقامة', highlighted: false, delay: ms(680)  },
  { num: '٣', icon: '📱', title: 'رمز OTP',             desc: 'يصلك على هاتفك مباشرة', highlighted: false, delay: ms(860)  },
  { num: '٤', icon: '🤳', title: 'التحقق من الوجه',    desc: 'إضاءة جيدة — انظر للكاميرا', highlighted: true,  delay: ms(1040) },
  { num: '٥', icon: '🏪', title: 'استكشف المتاجر',    desc: 'تصفح المتاجر المشاركة', highlighted: false, delay: ms(1220) },
  { num: '٦', icon: '🛍️', title: 'اختر منتجك',        desc: 'تسوّق كما تحب', highlighted: false, delay: ms(1400) },
  { num: '٧', icon: '💳', title: 'أضف بطاقتك',         desc: 'وحدد خيار التقسيم', highlighted: true,  delay: ms(1580) },
  { num: '٨', icon: '✅', title: 'اعتمد الدفع',         desc: 'مبروك — انتهيت!', highlighted: false, delay: ms(1760) },
];

const StepCard: React.FC<{
  num: string; icon: string; title: string; desc: string;
  highlighted: boolean; delayFrames: number;
}> = ({ num, icon, title, desc, highlighted, delayFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delayFrames);
  const s = spring({ frame: localFrame, fps, config: { damping: 18, stiffness: 220, mass: 0.7 } });
  const translateY = interpolate(s, [0, 1], [30, 0]);
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const glowPulse = highlighted ? 0.4 + Math.sin(frame * 0.1) * 0.15 : 0;

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        position: 'relative',
        background: '#111',
        border: highlighted
          ? `2px solid ${COLORS.gold}`
          : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        direction: 'rtl',
        boxShadow: highlighted ? `0 0 ${20 + glowPulse * 20}px ${COLORS.gold}55` : 'none',
      }}
    >
      {/* Gold top-right accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 20,
          height: 4,
          background: COLORS.gold,
          borderRadius: '0 0 4px 0',
        }}
      />

      {/* Step number */}
      <span
        style={{
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 900,
          fontSize: 13,
          color: COLORS.gold,
          opacity: 0.8,
        }}
      >
        {num}
      </span>

      <span style={{ fontSize: 28 }}>{icon}</span>

      <span
        style={{
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 700,
          fontSize: 18,
          color: COLORS.white,
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: '"Tajawal", sans-serif',
          fontWeight: 400,
          fontSize: 13,
          color: COLORS.greyMuted,
          lineHeight: 1.3,
        }}
      >
        {desc}
      </span>
    </div>
  );
};

export const Scene5Steps: React.FC = () => {
  return (
    <SceneBase bg={COLORS.bgDark} dark>
      {/* Gold grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.gold}0D 1px, transparent 1px),
                            linear-gradient(90deg, ${COLORS.gold}0D 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />
      <GoldLightRay />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          gap: 32,
        }}
      >
        {/* Title */}
        <AnimText
          text="خطوات التفعيل — خطوة بخطوة"
          delayFrames={ms(200)}
          animation="fadeUp"
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 52,
            color: COLORS.white,
            textAlign: 'center',
          }}
        />

        {/* 4x2 grid of cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 20,
            flex: 1,
          }}
        >
          {steps.map((step, i) => (
            <StepCard
              key={i}
              num={step.num}
              icon={step.icon}
              title={step.title}
              desc={step.desc}
              highlighted={step.highlighted}
              delayFrames={step.delay}
            />
          ))}
        </div>
      </div>
    </SceneBase>
  );
};
