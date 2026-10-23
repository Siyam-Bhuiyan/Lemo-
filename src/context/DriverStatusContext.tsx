import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface DriverStatus {
  online: boolean;
  setOnline: (value: boolean) => void;
  toggle: () => void;
}

const Context = createContext<DriverStatus | null>(null);

export function DriverStatusProvider({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState(true);
  const toggle = useCallback(() => setOnline((v) => !v), []);
  const value = useMemo(() => ({ online, setOnline, toggle }), [online, toggle]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useDriverStatus() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useDriverStatus must be used inside DriverStatusProvider');
  return ctx;
}
