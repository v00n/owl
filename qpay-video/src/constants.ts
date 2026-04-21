export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const COLORS = {
  bgDark: '#080808',
  bgDark2: '#0A0A0A',
  bgDark3: '#0D0D0D',
  bgLight: '#F5F5F0',
  gold: '#C9A84C',
  goldLight: '#E8C97A',
  red: '#C0392B',
  white: '#F5F5F0',
  greyMuted: '#888888',
  greyDark: '#333333',
} as const;

export const FONTS = {
  headline: '"Cairo", sans-serif',
  body: '"Tajawal", sans-serif',
} as const;

const s = (sec: number) => sec * FPS;

// Scene start frames and durations
export const SCENE_DEFS = [
  { id: 's1', label: 'HOOK',             startSec: 0,   durSec: 28 },
  { id: 's2', label: 'ما هو QPay',       startSec: 28,  durSec: 40 },
  { id: 's3', label: 'كيف يعمل',         startSec: 68,  durSec: 38 },
  { id: 's4', label: 'متطلبات التسجيل', startSec: 106, durSec: 38 },
  { id: 's5', label: 'خطوات التفعيل',   startSec: 144, durSec: 50 },
  { id: 's6', label: 'لماذا QPay',       startSec: 194, durSec: 42 },
  { id: 's7', label: 'إدارة الأقساط',   startSec: 236, durSec: 38 },
  { id: 's8', label: 'تنبيهات مهمة',    startSec: 274, durSec: 38 },
  { id: 's9', label: 'الخاتمة',          startSec: 312, durSec: 38 },
] as const;

export const TOTAL_DURATION_SEC = 350; // 5:50
export const TOTAL_FRAMES = s(TOTAL_DURATION_SEC);

export { s };
