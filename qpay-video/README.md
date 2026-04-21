# QPay Tutorial Video — FLTR.om

**Arabic YouTube video production project using Remotion**

- Channel: FLTR.om
- Topic: كيف تفعّل وتستخدم تطبيق QPay في عُمان؟
- Duration: ~5:50 min (350 seconds / 10,500 frames @ 30fps)
- Resolution: 1920×1080 @ 30fps
- Language: Arabic (RTL, Cairo + Tajawal fonts)

## Scenes

| # | Scene | Duration | Style |
|---|-------|----------|-------|
| 1 | HOOK | 28s | Dark + gold particles |
| 2 | ما هو QPay؟ | 40s | White split layout |
| 3 | كيف يعمل QPay؟ | 38s | Dark + 4-card payment row |
| 4 | ماذا تحتاج للتسجيل؟ | 38s | White + phone mockup |
| 5 | خطوات التفعيل | 50s | Dark + 8-card grid |
| 6 | لماذا QPay؟ | 42s | White + stat cards |
| 7 | إدارة الأقساط | 38s | Dark + calendar mockup |
| 8 | تنبيهات مهمة | 38s | Dark + red accents |
| 9 | CTA الخاتمة | 38s | Dark + gold burst |

## Getting Started

```bash
npm install
npm start         # Open Remotion Studio (live preview)
```

## Render to Video

```bash
npx remotion render QPay-Tutorial-AR out/QPay_Tutorial.mp4
```

## Assets Required

- `public/QPay_logo.png` — QPay blue logo on transparent background
- `public/music.mp3` — Cinematic background beat, ~130 BPM, no lyrics
- Voiceover MP3 per scene (ElevenLabs Arabic male voice, speed 0.90)

## Subtitles

`QPay_Arabic_Subtitles.srt` — Upload directly to YouTube Studio → Subtitles → Upload file

## Style

- Primary bg dark: `#080808`
- Gold: `#C9A84C`
- Red accent: `#C0392B`
- Fonts: Cairo Black 900 (headlines), Tajawal Regular 400 (body)
- All text: RTL direction
