import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { COLORS } from '../constants';

export const Logo: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 0.6], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: 48,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        direction: 'ltr',
      }}
    >
      {/* QPay logo placeholder — blue square with text */}
      <div
        style={{
          width: 80,
          height: 34,
          background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
        }}
      >
        <span
          style={{
            fontFamily: '"Cairo", sans-serif',
            fontWeight: 900,
            fontSize: 16,
            color: '#1A9BD7',
            letterSpacing: '-0.02em',
          }}
        >
          QPay
        </span>
      </div>
    </div>
  );
};

export const ChannelWatermark: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 0.5], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 44,
        right: 48,
        opacity,
        fontFamily: '"Cairo", sans-serif',
        fontWeight: 900,
        fontSize: 18,
        color: COLORS.gold,
        letterSpacing: '0.3em',
        direction: 'ltr',
      }}
    >
      FLTR.OM
    </div>
  );
};
