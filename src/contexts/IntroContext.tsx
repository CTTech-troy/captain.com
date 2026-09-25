import type { ReactNode } from 'react';
import { IntroContext } from './introState';
const ready = { done: true, complete: () => undefined };
/** Initial content is visible immediately; decorative motion must not gate rendering. */
export function IntroProvider({ children }: { children: ReactNode }) {
  return <IntroContext.Provider value={ready}>{children}</IntroContext.Provider>;
}
