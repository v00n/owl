import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';
import { FilmGrain } from '../components/Particles';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const warnings = [
  { title: 'التحقق من الوجه إلزامي', sub: 'إضاءة كافية وصورة واضحة تماماً', delay: ms(600) },
  { title: 'دفعة فائتة = تجميد الحساب', sub: 'لن تتمكن من الشراء حتى تُسدّد ما عليك', delay: ms(950) },
  { title: 'ليست كل المتاجر مشاركة', sub: 'تحقق من القائمة داخل التطبيق أولاً', delay: ms(1300) },
  { title: 'حافظ على التطبيق محدّثاً', sub: 'بعض المستخدمين واجهوا مشاكل بعد آخر تحديث', delay: ms(1650) },
];

const contacts = [
  { icon: '📞', label: 'الدعم المباشر', value: '24162616',          delay: ms(500) },
  { icon: '💬', label: 'واتساب',        value: '+968 72222468',     delay: ms(700) },
  { icon: '📧', label: 'البريد',         value: 'info@qpay.om',     delay: ms(900) },
];

const WarningCard: React.FC<{ title: string; sub: string; delayFrames: number }> = ({
  title, sub, delayFrames,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delayFrames);
  const opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const translateX = interpolate(localFrame, [0, 18], [40, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        background: 'rgba(192,57,43,0.08)',
        border: `1px solid ${COLORS.red}55`,
        borderRight: `3px solid ${COLORS.red}`,
        borderRadius: 12,
        padding: '16px 20px',
        direction: 'rtl',
      }}
    >
      <div
        style={{
          fontFamily: '"Cairo", sans-serif',
          fontWeight: 700,
          fontSize: 19,
          color: COLORS.white,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: '"Tajawal", sans-serif',
          fontWeight: 400,
          fontSize: 14,
          color: COLORS.greyMuted,
        }}
      >
        {sub}
      </div>
    </div>
  );
};

const ContactCard: React.FC<{ icon: string; label: string; value: string; delayFrames: number }> = ({
  icon, label, value, delayFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delayFrames);
  const s = spring({ frame: localFrame, fps, config: { damping: 16, stiffness: 200, mass: 0.8 } });
  const translateY = interpolate(s, [0, 1], [30, 0]);
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        background: '#1A1A1A',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 14,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        direction: 'rtl',
        width: 280,
      }}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      <div>
        <div
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontSize: 12,
            color: COLORS.greyMuted,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 17,
            color: COLORS.white,
            direction: 'ltr',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export const Scene8Warnings: React.FC = () => {
  const frame = useCurrentFrame();
  const redGlow = 0.06 + Math.sin(frame * 0.06) * 0.02;

  return (
    <SceneBase bg={COLORS.bgDark2} dark>
      <FilmGrain />

      {/* Red radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.red}33 0%, transparent 60%)`,
          opacity: redGlow,
          pointerEvents: 'none',
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
        {/* Left — Contact cards */}
        <div
          style={{
            flex: '0 0 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {contacts.map((c, i) => (
            <ContactCard key={i} icon={c.icon} label={c.label} value={c.value} delayFrames={c.delay} />
          ))}
        </div>

        {/* Right — Warnings */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            direction: 'rtl',
          }}
        >
          {/* Warning header */}
          <AnimText
            text="⚠️ تنبيهات مهمة"
            delayFrames={ms(200)}
            animation="fadeUp"
            style={{
              fontFamily: '"Cairo", sans-serif',
              fontWeight: 900,
              fontSize: 52,
              color: COLORS.white,
              marginBottom: 8,
            }}
          />

          {warnings.map((w, i) => (
            <WarningCard key={i} title={w.title} sub={w.sub} delayFrames={w.delay} />
          ))}
        </div>
      </div>
    </SceneBase>
  );
};
