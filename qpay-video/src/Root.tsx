import React from 'react';
import { Composition, Series, Audio, staticFile } from 'remotion';
import { FPS, WIDTH, HEIGHT, TOTAL_FRAMES, SCENE_DEFS } from './constants';

import { Scene1Hook }         from './scenes/Scene1Hook';
import { Scene2WhatIsQPay }   from './scenes/Scene2WhatIsQPay';
import { Scene3HowItWorks }   from './scenes/Scene3HowItWorks';
import { Scene4Requirements } from './scenes/Scene4Requirements';
import { Scene5Steps }        from './scenes/Scene5Steps';
import { Scene6WhyQPay }      from './scenes/Scene6WhyQPay';
import { Scene7Installments } from './scenes/Scene7Installments';
import { Scene8Warnings }     from './scenes/Scene8Warnings';
import { Scene9CTA }          from './scenes/Scene9CTA';

const GoogleFonts: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;700;900&family=Tajawal:wght@300;400;500;700&display=swap');
  `}</style>
);

const QPay: React.FC = () => (
  <>
    <GoogleFonts />
    <Series>
      <Series.Sequence durationInFrames={SCENE_DEFS[0].durSec * FPS}>
        <Scene1Hook />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[1].durSec * FPS}>
        <Scene2WhatIsQPay />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[2].durSec * FPS}>
        <Scene3HowItWorks />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[3].durSec * FPS}>
        <Scene4Requirements />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[4].durSec * FPS}>
        <Scene5Steps />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[5].durSec * FPS}>
        <Scene6WhyQPay />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[6].durSec * FPS}>
        <Scene7Installments />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[7].durSec * FPS}>
        <Scene8Warnings />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DEFS[8].durSec * FPS}>
        <Scene9CTA />
      </Series.Sequence>
    </Series>
  </>
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="QPay-Tutorial-AR"
    component={QPay}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
