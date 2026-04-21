import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FPS } from '../constants';
import { AnimText } from '../components/AnimText';
import { SceneBase } from '../components/SceneBase';

const ms = (milliseconds: number) => Math.round((milliseconds / 1000) * FPS);

const features = [
  { icon: '📊', title: 'تتبع جميع مشترياتك وأقساطك', sub: 'لوحة تحكم واضحة لكل معاملاتك', delay: ms(800) },
  { icon: '🗓️', title: 'إعادة جدولة الدفعات', sub: 'مرونة حقيقية تناسب ظروفك', delay: ms(1100) },
  { icon: '💰', title: 'معرفة حد الائتمان المتاح', sub: 'دائماً على علم بما يمكنك إنفاقه', delay: ms(1400) },
  { icon: '🔔', title: 'تذكيرات قبل كل دفعة', sub: 'التطبيق يُنبّهك مسبقاً — لا تفوتك دفعة', delay: ms(1700) },
];

const FeatureCard: React.FC<{ icon: string; title: string; sub: string; delayFrames: number }> = ({
  icon, title, sub, delayFrames,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delayFrames);
  const opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const translateY = interpolate(localFrame, [0, 18], [20, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        direction: 'rtl',
      }}
    >
      <span style={{ fontSize: 32, flexShrink: 0 }}>{icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 20,
            color: COLORS.white,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: '"Tajawal", sans-serif',
            fontWeight: 400,
            fontSize: 14,
            color: COLORS.greyMuted,
          }}
        >
          {sub}
        </span>
      </div>
    </div>
  );
};

const CalendarMockup: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);
  const s = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 160, mass: 1.2 } });
  const translateY = interpolate(s, [0, 1], [50, 0]);
  const opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  const days = ['أح', 'إث', 'ث', 'أر', 'خ', 'ج', 'س'];
  const dates = [
    ['', '', '', '1', '2', '3', '4'],
    ['5', '6', '7', '8', '9', '10', '11'],
    ['12', '13', '14', '15', '16', '17', '18'],
    ['19', '20', '21', '22', '23', '24', '25'],
    ['26', '27', '28', '29', '30', '', ''],
  ];
  const highlightedDates = ['1', '8', '15', '22'];

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        background: '#1A1A1A',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 24,
        padding: 24,
        width: 320,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${COLORS.gold}22`,
      }}
    >
      <div style={{ direction: 'rtl' }}>
        {/* Month label */}
        <div
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 700,
            fontSize: 18,
            color: COLORS.white,
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          مواعيد الدفع — أبريل
        </div>

        {/* Day headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 2,
            marginBottom: 8,
          }}
        >
          {days.map((d, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                fontFamily: '"Tajawal", sans-serif',
                fontSize: 11,
                color: COLORS.greyMuted,
                padding: '4px 0',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        {dates.map((week, wi) => (
          <div
            key={wi}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 2,
              marginBottom: 2,
            }}
          >
            {week.map((day, di) => {
              const isHighlighted = highlightedDates.includes(day);
              return (
                <div
                  key={di}
                  style={{
                    textAlign: 'center',
                    padding: '6px 2px',
                    borderRadius: 8,
                    fontFamily: '"Tajawal", sans-serif',
                    fontSize: 13,
                    color: isHighlighted ? '#000' : day ? COLORS.white : 'transparent',
                    background: isHighlighted ? COLORS.gold : 'transparent',
                    fontWeight: isHighlighted ? 700 : 400,
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 3, background: COLORS.gold }} />
          <span style={{ fontFamily: '"Tajawal", sans-serif', fontSize: 12, color: COLORS.greyMuted }}>
            موعد الدفعة
          </span>
        </div>
      </div>
    </div>
  );
};

export const Scene7Installments: React.FC = () => {
  return (
    <SceneBase bg={COLORS.bgDark2} dark>
      {/* Subtle light */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${COLORS.gold}18 0%, transparent 70%)`,
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
        {/* Left — Calendar */}
        <div style={{ flex: '0 0 320px', display: 'flex', justifyContent: 'center' }}>
          <CalendarMockup delay={ms(400)} />
        </div>

        {/* Right — Features */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            direction: 'rtl',
          }}
        >
          <div>
            <AnimText
              text="إدارة أقساطك"
              delayFrames={ms(200)}
              animation="fadeUp"
              style={{
                fontFamily: '"Cairo", sans-serif',
                fontWeight: 900,
                fontSize: 60,
                color: COLORS.white,
                lineHeight: 1.1,
              }}
            />
            <AnimText
              text="أسهل مما تتخيل"
              delayFrames={ms(500)}
              animation="fadeUp"
              style={{
                fontFamily: '"Cairo", sans-serif',
                fontWeight: 900,
                fontSize: 60,
                color: COLORS.gold,
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            />
          </div>

          {features.map((f, i) => (
            <FeatureCard key={i} icon={f.icon} title={f.title} sub={f.sub} delayFrames={f.delay} />
          ))}
        </div>
      </div>
    </SceneBase>
  );
};
