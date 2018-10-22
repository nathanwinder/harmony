/**
 * A translated phrase.
 */
export interface ILocalization {
  /**
   * The translated phrase
   */
  phrase: string;

  /**
   * The language of the translated phrase,
   * may be different than the requested language
   * if a translation could not be found.
   */
  language: string;

  /**
   * The locale of the translated phrase,
   * may be different than the requested locale
   * if a translation could not be found.
   */
  locale: string | undefined;
}
