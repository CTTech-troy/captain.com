import { createContext, useContext } from 'react';
export interface IntroState { done: boolean; complete: () => void }
export const IntroContext = createContext<IntroState>({ done: true, complete: () => undefined });
export function useIntro(): IntroState { return useContext(IntroContext); }
