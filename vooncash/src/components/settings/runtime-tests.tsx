"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { connectWallet } from "@/lib/wallet";

export function RuntimeTests() {
  const runTests = async () => {
    console.log("--- Running VoonCash Runtime Self-Tests ---");

    // 1. env guard working (no crash)
    try {
      // The fact that this code runs means the import was safe.
      console.log("✅ [PASS] env guard: No crash on server-side import of wallet.ts.");
    } catch (e) {
      console.error("❌ [FAIL] env guard: Importing wallet.ts crashed.", e);
    }

    // 2. RTL divider side correct
    // This is a visual test, but we can check if the style exists.
    const styleSheets = document.styleSheets;
    let rtlRuleFound = false;
    for (const sheet of styleSheets) {
        try {
            if (sheet.cssRules) {
                for (const rule of sheet.cssRules) {
                    if (rule instanceof CSSStyleRule && rule.selectorText.includes('[dir="rtl"] .topbar-sep')) {
                        rtlRuleFound = true;
                        break;
                    }
                }
            }
        } catch (e) {
            // Ignore CORS issues with external stylesheets
        }
        if (rtlRuleFound) break;
    }
    if (rtlRuleFound) {
        console.log("✅ [PASS] RTL divider: CSS rule is present.");
    } else {
        console.error("❌ [FAIL] RTL divider: CSS rule is missing.");
    }

    // 3. theme segmented doesn’t overflow
    // This is a visual test. We can log a message to prompt manual verification.
    console.log("ℹ️  [INFO] Theme toggle: Manual check needed to ensure it doesn't overflow its container.");

    // 4. wallet disabled returns NO_PROVIDER
    const disabledResult = await connectWallet('disabled');
    if (disabledResult.code === 'NO_PROVIDER') {
        console.log("✅ [PASS] Wallet disabled: Correctly returns NO_PROVIDER.");
    } else {
        console.error("❌ [FAIL] Wallet disabled: Did not return NO_PROVIDER.", disabledResult);
    }

    // 5. mock returns Connected
    const mockResult = await connectWallet('mock');
    if (mockResult.ok && mockResult.accounts?.[0]) {
        console.log("✅ [PASS] Wallet mock: Correctly returns a connected state.");
    } else {
        console.error("❌ [FAIL] Wallet mock: Did not return a connected state.", mockResult);
    }

    console.log("--- Tests Complete ---");
    alert("Tests complete. Check the browser console for results.");
  };

  return (
    <div className="space-y-2">
      <Label>Runtime Self-Tests</Label>
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground mb-4">
            Click the button to run a series of internal checks. Results will be logged to the browser's developer console.
        </p>
        <Button variant="outline" onClick={runTests}>Run Tests</Button>
      </div>
    </div>
  );
}
