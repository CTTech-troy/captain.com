import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface IntroState {
  done: boolean;
  complete: () => void;
}

const IntroContext = createContext<IntroState>({ done: true, complete: () => undefined });

export function IntroProvider({ children }: {children: ReactNode;}) {
  const [done, setDone] = useState(false);
  const complete = useCallback(() => setDone(true), []);
  const value = useMemo(() => ({ done, complete }), [done, complete]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroState {
  return useContext(IntroContext);
}