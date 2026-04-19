import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

INPUT_HTML  = Path(__file__).parent / "carousel.html"
OUTPUT_DIR  = Path(__file__).parent / "slides"
OUTPUT_DIR.mkdir(exist_ok=True)

TOTAL_SLIDES    = 7
VIEW_W, VIEW_H  = 420, 525
SCALE           = 1080 / 420          # → 1080×1350 px output


async def export_slides() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
        )
        page    = await browser.new_page(
            viewport={"width": VIEW_W, "height": VIEW_H},
            device_scale_factor=SCALE,
        )

        html = INPUT_HTML.read_text(encoding="utf-8")
        await page.set_content(html, wait_until="networkidle")
        await page.wait_for_timeout(3000)   # let Google Fonts load

        # Strip IG chrome & lock down frame for pixel-perfect crop
        await page.evaluate("""() => {
            document.querySelectorAll(
                '.ig-header,.ig-dots,.ig-actions,.ig-caption'
            ).forEach(el => el.style.display = 'none');

            const frame = document.querySelector('.ig-frame');
            frame.style.cssText =
                'width:420px;height:525px;max-width:none;border-radius:0;' +
                'box-shadow:none;overflow:hidden;margin:0;';

            const vp = document.querySelector('.carousel-viewport');
            vp.style.cssText =
                'width:420px;height:525px;aspect-ratio:unset;' +
                'overflow:hidden;cursor:default;';

            document.body.style.cssText =
                'padding:0;margin:0;display:block;overflow:hidden;background:#000;';
        }""")
        await page.wait_for_timeout(300)

        for i in range(TOTAL_SLIDES):
            # Jump track to the correct slide (no animation)
            await page.evaluate("""(idx) => {
                const t = document.querySelector('.carousel-track');
                t.style.transition = 'none';
                t.style.transform  = `translateX(${-idx * 420}px)`;
            }""", i)
            await page.wait_for_timeout(300)

            out = OUTPUT_DIR / f"slide_{i + 1:02d}.png"
            await page.screenshot(
                path=str(out),
                clip={"x": 0, "y": 0, "width": VIEW_W, "height": VIEW_H},
            )
            print(f"  ✓  slide {i + 1}/{TOTAL_SLIDES}  →  {out.name}")

        await browser.close()
    print(f"\nDone — {TOTAL_SLIDES} slides saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(export_slides())
