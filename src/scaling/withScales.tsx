import React, { Context } from "react";
import { Omit } from "./interfaces";
import { IScale, IScaleContextValue } from "./ScaleContext";

export type IWithScaleProps<P, S extends string, K extends keyof P> = Omit<
  P,
  K
> &
  { [Key in K]: P[K] | S };

export type IWithScale<
  P,
  S extends string,
  K extends keyof P
> = React.ComponentType<IWithScaleProps<P, S, K>>;

export default function withScale<
  T extends IScale,
  S extends string,
  K extends keyof P,
  P
>(
  Component: React.ComponentType<P>,
  ScaleContext: Context<IScaleContextValue<T>>,
  ...props: K[]
): IWithScale<P, S, K> {
  type ScaledProps = { [Key in K]: P[K] | S };
  class WithScale extends React.Component<Omit<P, K> & ScaledProps> {
    public render() {
      return (
        <ScaleContext.Consumer>
          {s => {
            const updatedProps: any = {};
            for (const k of props) {
              const value = this.props[k];
              if (typeof value === "number") {
                updatedProps[k] = value;
              } else {
                updatedProps[k] = s.scale[this.props[k] as any];
              }
            }

            return <Component {...this.props} {...updatedProps} />;
          }}
        </ScaleContext.Consumer>
      );
    }
  }

  (WithScale as any).displayName = `${Component.name}.WithScale`;
  return WithScale;
}
