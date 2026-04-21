import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';

interface AnimTextProps {
  text: string;
  style?: React.CSSProperties;
  delayFrames?: number;
  animation?: 'fadeUp' | 'popScale' | 'fade' | 'slideRight' | 'slideLeft';
}

export const AnimText: React.FC<AnimTextProps> = ({
  text,
  style,
  delayFrames = 0,
  animation = 'fadeUp',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delayFrames);

  let opacity = 1;
  let translateY = 0;
  let scale = 1;
  let translateX = 0;

  if (animation === 'fadeUp') {
    opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
    translateY = interpolate(localFrame, [0, 18], [28, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  } else if (animation === 'fade') {
    opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  } else if (animation === 'popScale') {
    const s = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 200, mass: 0.8 } });
    scale = interpolate(s, [0, 1], [0.5, 1]);
    opacity = interpolate(localFrame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  } else if (animation === 'slideRight') {
    translateX = interpolate(localFrame, [0, 18], [-40, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
    opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  } else if (animation === 'slideLeft') {
    translateX = interpolate(localFrame, [0, 18], [40, 0], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
    opacity = interpolate(localFrame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  }

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
