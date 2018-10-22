import React, { createContext, PureComponent } from "react";
import { Formatter } from "./Formatter";
import { ILocalizationDictionaryProvider } from "./ILocalizationDictionaryProvider";
import { LocalizationContextValue } from "./LocalizationContextValue";
import { LocalizationEventEmmiter } from "./LocalizationEventEmmiter";

interface ILocalizationContextProviderProps {
  language?: string;
  locale?: string;
}

export interface ILocalizationContext<TArgs> {
  Provider: React.ComponentType<ILocalizationContextProviderProps>;
  Consumer: React.Consumer<LocalizationContextValue<TArgs>>;
}

export function createLocalizationContext<TArgs = any>(
  defaultLanguage: string,
  defaultLocale: string | undefined,
  formatter: Formatter<TArgs>,
  dictionaryProvider: ILocalizationDictionaryProvider,
  auditor?: LocalizationEventEmmiter
): ILocalizationContext<TArgs> {
  const Context = createContext(
    new LocalizationContextValue(
      defaultLanguage,
      defaultLocale,
      formatter,
      dictionaryProvider,
      () => {
        /* do nothing */
      },
      auditor
    )
  );

  class LocalizationContextProvider extends PureComponent<
    ILocalizationContextProviderProps,
    ILocalizationContextProviderProps
  > {
    public static getDerivedStateFromProps(
      props: ILocalizationContextProviderProps
    ): ILocalizationContextProviderProps {
      return props;
    }

    public render(): React.ReactNode {
      return (
        <Context.Consumer>
          {l => {
            return (
              <Context.Provider
                value={l.withLanguage(
                  this.state.language || l.language,
                  this.state.locale,
                  this.onLanguageChange
                )}
              >
                {this.props.children}
              </Context.Provider>
            );
          }}
        </Context.Consumer>
      );
    }

    private readonly onLanguageChange = (
      language: string,
      locale: string | undefined
    ) => {
      this.setState({ language, locale });
    };
  }

  return {
    Provider: LocalizationContextProvider,
    Consumer: Context.Consumer
  };
}
