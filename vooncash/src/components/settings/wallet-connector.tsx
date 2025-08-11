"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { WalletMode } from "@/lib/types";
import { connectWallet } from "@/lib/wallet";
import { cn } from "@/lib/utils";

export function WalletConnector() {
  const { state, setWalletMode } = useAppContext();
  const { walletMode } = state.settings;

  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<{ok: boolean, message: string, connected: boolean}>({ ok: false, message: 'Not connected.', connected: false });

  const handleConnect = async () => {
    setIsConnecting(true);
    setStatus({ ok: false, message: 'Connecting...', connected: false });
    const result = await connectWallet(walletMode);

    if (result.ok) {
        setStatus({ ok: true, message: `Connected: ${result.accounts?.[0].substring(0, 6)}...${result.accounts?.[0].substring(38)}`, connected: true });
    } else {
        setStatus({ ok: false, message: `Error: ${result.code}`, connected: false });
    }
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    setStatus({ ok: false, message: 'Not connected.', connected: false });
  }

  useEffect(() => {
    // Reset status when mode changes
    handleDisconnect();
  }, [walletMode]);

  return (
    <div className="space-y-2">
      <Label>Wallet</Label>
      <div className="space-y-4 rounded-lg border p-4">
        <div className="space-y-2">
            <Label htmlFor="wallet-mode">Mode</Label>
            <Select onValueChange={(value: WalletMode) => setWalletMode(value)} defaultValue={walletMode}>
                <SelectTrigger id="wallet-mode">
                    <SelectValue placeholder="Select wallet mode" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="mock">Mock</SelectItem>
                    <SelectItem value="browser">Browser Wallet</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="flex items-center justify-between">
            {status.connected ? (
                <Button variant="outline" onClick={handleDisconnect}>Disconnect</Button>
            ) : (
                <Button onClick={handleConnect} disabled={isConnecting || walletMode === 'disabled'}>
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
            )}
        </div>

        <div className="text-sm text-muted-foreground p-2 rounded-md bg-secondary">
          <p>Status: <span className={cn(status.ok ? 'text-green-500' : 'text-amber-500')}>{status.message}</span></p>
        </div>
      </div>
    </div>
  );
}
