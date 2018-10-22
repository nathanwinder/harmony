import { ILocalizationDictionary } from "./ILocalizationDictionary";

/**
 * Use to get a dictionary based on language and locale.
 */
export interface ILocalizationDictionaryProvider {
  /**
   * Gets the dictionary for the provided lanuage and locale.
   *
   */
  getDictionary: (
    language: string,
    locale: string | undefined
  ) => ILocalizationDictionary | undefined | null;
}
