import { ILocalization } from "./ILocalization";

/**
 * An event raised when a phrase is translated.
 */
export interface ILocalizationEvent {
  /**
   * The string that requires translation.
   */
  phrase: string;

  /**
   * The requested language.
   */
  language: string;

  /**
   * The requested locale, if any.
   */
  locale: string | undefined;

  /**
   * The translation, if any, that was returned.
   * The language and locale of the translation
   * may not match the requested lanage and locale.
   * This indicates that a suitable replacement was
   * available.
   */
  translation: ILocalization | null | undefined;
}

export type LocalizationEventHandler = (event: ILocalizationEvent) => void;
