import { Formatter } from "./Formatter";
import { ILocalizationDictionaryProvider } from "./ILocalizationDictionaryProvider";
import { LocalizationEventEmmiter } from "./LocalizationEventEmmiter";

export class LocalizationContextValue<TArgs = any> {
  constructor(
    public readonly language: string,
    public readonly locale: string | undefined,
    private readonly formatter: Formatter,
    private readonly localizationProvider: ILocalizationDictionaryProvider,
    private readonly setLanguageCallback: (
      language: string,
      locale?: string
    ) => void,
    private readonly auditor: LocalizationEventEmmiter | undefined | null,
    private readonly localizations = localizationProvider.getDictionary(
      language,
      locale
    )
  ) {}

  /**
   * Sets the language and locale to be used in the current context.
   *
   * This API supports nested localization contexts, this method sets
   * the localization for the inner-most context but has no effect on this
   * context's ancestors. If a more targeted approach is required consider using an
   * external state manager like redux or mobx.
   * @param language The language to set in the current context.
   * @param locale The locale to set in the current context.
   */
  public setLanguage(language: string, locale?: string) {
    this.setLanguageCallback(language, locale);
  }

  /**
   *
   * @param phrase The phrase to translate and format
   * @param args The arguments supplied to the formatter.
   */
  public format(phrase: null, args: TArgs): null;
  public format(phrase: undefined, args: TArgs): undefined;
  public format(phrase: string, args: TArgs): string;
  public format(
    phrase: string | null | undefined,
    args: any
  ): string | null | undefined {
    if (!phrase) {
      return phrase;
    }

    const localPhrase = this.localize(phrase);
    return this.formatter(this, localPhrase, args);
  }

  /**
   * Localizes a phrase in the current language and locale.
   *
   * @param phrase The phrase to translate.
   */
  public localize(phrase: string): string;
  public localize(phrase: null): null;
  public localize(phrase: undefined): undefined;
  public localize(
    phrase: string | null | undefined
  ): string | null | undefined {
    if (!phrase) {
      return phrase;
    }
    if (!this.localizations) {
      return phrase;
    }

    const localization = this.localizations[phrase];

    if (this.auditor) {
      if (
        !localization ||
        !localization.phrase ||
        this.language !== localization.language ||
        this.locale !== localization.locale
      ) {
        this.auditor.emit("miss", {
          phrase,
          language: this.language,
          locale: this.locale,
          translation: localization
        });
      } else {
        this.auditor.emit("hit", {
          phrase,
          language: this.language,
          locale: this.locale,
          translation: localization
        });
      }
    }

    if (localization && localization.phrase) {
      return localization.phrase;
    }

    return phrase;
  }

  public withLanguage(
    language: string,
    locale: string | undefined,
    setLanguageCallback: (language: string, locale?: string) => void
  ) {
    return new LocalizationContextValue<TArgs>(
      language,
      locale,
      this.formatter,
      this.localizationProvider,
      setLanguageCallback,
      this.auditor
    );
  }
}
