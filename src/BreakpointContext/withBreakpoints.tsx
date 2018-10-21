import React, { Consumer } from "react";
import { BreakpointContextValue } from ".";
import { Omit } from "./interfaces";

type ScaledProps<T, B extends string> = {
  [K in keyof T]: T[K] | { [X in B]: T[K] }
};

export type IWithBreakpointProps<P, B extends string, K extends keyof P> = Omit<
  P,
  K
> &
  Pick<ScaledProps<P, B>, K>;

export type IWithBreakpoints<
  P,
  B extends string,
  K extends keyof P
> = React.ComponentType<Omit<P, K> & Pick<ScaledProps<P, B>, K>>;

export default function withBreakpoints<P, B extends string, K extends keyof P>(
  Component: React.ComponentType<P>,
  BreakpointConsumer: Consumer<BreakpointContextValue<B>>,
  ...props: K[] // TODO: Limit K so that it only includes properties with values that do not extend 'object'.
): IWithBreakpoints<P, B, K> {
  class WithBreakpoints extends React.Component<
    Omit<P, K> & Pick<ScaledProps<P, B>, K>
  > {
    public render() {
      // If any of the properties are breakpoint maps then we'll need
      // to know the current breakpoint to select the right value. If breakpoints
      // are not required we can optimize the code by not using
      // the BreakpointConsumer.
      let requiresMapping: boolean = false;
      for (const key of props) {
        const value = this.props[key];
        if (value !== undefined) {
          if (typeof value === "object") {
            requiresMapping = true;
            break;
          }
        }
      }
      if (requiresMapping) {
        return (
          <BreakpointConsumer>
            {bp => {
              const mappedProps: Partial<Pick<P, K>> = {};
              for (const key of props) {
                const value = this.props[key];
                if (value !== undefined) {
                  if (typeof value === "object") {
                    mappedProps[key] = (value as any)[bp.breakpoint];
                  }
                }
              }
              return <Component {...this.props} {...mappedProps} />;
            }}
          </BreakpointConsumer>
        );
      } else {
        return <Component {...this.props} />;
      }
    }
  }

  (WithBreakpoints as any).displayName = `${
    Component.displayName
  }.WithBreakpoints`;
  return WithBreakpoints;
}
