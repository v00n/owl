"use client";

import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { AppState } from "@/lib/types";

export function DataActions() {
  const { state, resetData, importData } = useAppContext();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(state)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `vooncash_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const importedState = JSON.parse(content) as AppState;
            // TODO: Add more robust validation for the imported state shape
            if (importedState.transactions && importedState.settings) {
                importData(importedState);
            } else {
                throw new Error("Invalid data format");
            }
          }
        } catch (error) {
          alert("Failed to import data. The file might be corrupted or in the wrong format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Data Management</Label>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleExport}>Export JSON</Button>
        <Button variant="outline" onClick={handleImportClick}>Import JSON</Button>
        <Button variant="destructive" onClick={resetData}>Reset Data</Button>
        <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".json"
        />
      </div>
    </div>
  );
}
