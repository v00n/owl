import React from 'react';
import { COLORS } from '../constants';
import { Logo, ChannelWatermark } from './Logo';

interface SceneBaseProps {
  bg: string;
  dark?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SceneBase: React.FC<SceneBaseProps> = ({ bg, dark = true, children, style }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: bg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Cairo", sans-serif',
      direction: 'rtl',
      ...style,
    }}
  >
    {children}
    <Logo dark={dark} />
    <ChannelWatermark dark={dark} />
  </div>
);
