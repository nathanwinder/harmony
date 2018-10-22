import React, { PureComponent } from "react";
import { ILocalizationContext } from ".";
import { Omit } from "./interfaces";

type LocalizationValue<T> = {
  [K in keyof T]: T[K] | { phrase: T[K]; args: any }
};

export type IWithLocalizationProps<P, K extends keyof P> = Omit<P, K> &
  Pick<LocalizationValue<P>, K>;

export function withLocalization<P, K extends keyof P>(
  Component: React.ComponentType<P>,
  Context: ILocalizationContext<any>,
  ...props: K[]
) {
  class WithLocalization extends PureComponent {
    public render(): React.ReactNode {
      return (
        <Context.Consumer>
          {l => {
            const updateProps: any = {};
            for (const key of props) {
              const value = (this.props as any)[key];
              if (typeof value === "string") {
                updateProps[key] = l.localize(value);
              } else if (typeof value === "object") {
                updateProps[key] = l.format(value.phrase, value.args);
              }
            }
            return <Component {...this.props} {...updateProps} />;
          }}
        </Context.Consumer>
      );
    }
  }

  (WithLocalization as any).displayName = `${Component.displayName ||
    Component.name}.WithLocalization`;
  return WithLocalization;
}
