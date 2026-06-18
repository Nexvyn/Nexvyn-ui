"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type PreviewControlContextType = {
  values: Record<string, string>;
  getValue: (key: string, fallback: string) => string;
  setValue: (key: string, value: string) => void;
};

const PreviewControlContext = createContext<PreviewControlContextType>({
  values: {},
  getValue: (_key, fallback) => fallback,
  setValue: () => {},
});

export function PreviewControlProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const getValue = useCallback((key: string, fallback: string) => values[key] ?? fallback, [values]);
  const setValue = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <PreviewControlContext.Provider value={{ values, getValue, setValue }}>
      {children}
    </PreviewControlContext.Provider>
  );
}

export function usePreviewControl(key: string, defaultValue: string): [string, (value: string) => void] {
  const { getValue, setValue } = useContext(PreviewControlContext);
  return [getValue(key, defaultValue), (v) => setValue(key, v)];
}
