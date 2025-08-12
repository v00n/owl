"use client";

import React,
{
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { AppState, Transaction, Theme, Language, Currency, WalletMode, Tab } from "@/lib/types";

// Define the shape of the context
interface AppContextType {
  state: AppState;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
  setWalletMode: (mode: WalletMode) => void;
  setEmergencyFundTarget: (target: number) => void;
  contributeToEmergencyFund: (amount: number) => void;
  setMonthlyBudget: (budget: number) => void;
  setActiveTab: (tab: Tab) => void;
  resetData: () => void;
  importData: (data: AppState) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial state of the application
const initialState: AppState = {
  transactions: [],
  emergencyFund: { target: 1000, current: 0 },
  settings: {
    theme: "system",
    language: "en",
    currency: "USD",
    walletMode: "disabled",
    monthlyBudget: 2000,
    activeTab: 'overview',
  },
};

// Create the provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<AppState>("vooncash_data", initialState);

  const actions = useMemo(() => ({
    addTransaction: (transaction: Omit<Transaction, "id">) => {
      const newTransaction = { ...transaction, id: crypto.randomUUID() };
      setState((prev) => ({
        ...prev,
        transactions: [newTransaction, ...prev.transactions],
      }));
    },
    deleteTransaction: (id: string) => {
      setState((prev) => ({
        ...prev,
        transactions: prev.transactions.filter((t) => t.id !== id),
      }));
    },
    setTheme: (theme: Theme) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, theme } }));
    },
    setLanguage: (language: Language) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, language } }));
    },
    setCurrency: (currency: Currency) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, currency } }));
    },
    setWalletMode: (mode: WalletMode) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, walletMode: mode } }));
    },
    setEmergencyFundTarget: (target: number) => {
      setState((prev) => ({ ...prev, emergencyFund: { ...prev.emergencyFund, target } }));
    },
    contributeToEmergencyFund: (amount: number) => {
      setState((prev) => ({
        ...prev,
        emergencyFund: {
          ...prev.emergencyFund,
          current: prev.emergencyFund.current + amount,
        },
      }));
    },
    setMonthlyBudget: (budget: number) => {
        setState(prev => ({...prev, settings: {...prev.settings, monthlyBudget: budget}}))
    },
    setActiveTab: (tab: Tab) => {
      setState((prev) => ({ ...prev, settings: { ...prev.settings, activeTab: tab } }));
    },
    resetData: () => {
        if(window.confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
            setState(initialState);
        }
    },
    importData: (data: AppState) => {
        // Simple merge, could be more sophisticated
        if(window.confirm("Are you sure you want to import data? This will overwrite existing data.")) {
            setState(data);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [setState]);

  const contextValue = useMemo(() => ({
      state,
      ...actions
  }), [state, actions]);


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
