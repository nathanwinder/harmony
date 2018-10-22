import { LocalizationContextValue } from "./LocalizationContextValue";

export type Formatter<TArgs = any> = (
  context: LocalizationContextValue<TArgs>,
  phrase: string,
  args: TArgs
) => string;
