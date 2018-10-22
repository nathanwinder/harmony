import { ILocalization } from "./ILocalization";

/**
 * A dictionary of translated phrases.
 */
export interface ILocalizationDictionary {
  [key: string]: ILocalization | undefined | null;
}
