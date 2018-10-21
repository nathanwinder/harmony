import { createContext } from "react";

export interface IScale {
  [key: string]: number;
}

export interface IScaleContextValue<T extends IScale> {
  scale: T;
}

export function createScaleContext<T extends IScale>(defaultScale: T) {
  const scaleContext = createContext({ scale: defaultScale });

  (scaleContext as any).displayName = "ScaleContext";
  return scaleContext;
}
