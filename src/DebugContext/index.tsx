import React, { Context, createContext } from "react";

export type DebugContext = Context<boolean> & { enabled: boolean };

export function createDebugContext(): DebugContext {
  const context = createContext(false) as DebugContext;
  (context as any).displayName = "DebugContext";
  context.enabled = true;
  return context;
}

export interface IDebugContextValue {
  debugging: boolean;
}

export type IWithDebug<P extends { debug?: boolean }> = React.ComponentType<P>;

export function withDebug<P extends { debug?: boolean }>(
  Component: React.ComponentType<P>,
  debugContext: DebugContext
) {
  if (debugContext && debugContext.enabled) {
    const Ctx = debugContext;
    class WithDebug extends React.Component<P> {
      public render() {
        if (this.props.debug == null) {
          return (
            <Ctx.Consumer>
              {d => <Component {...this.props} debug={d} />}
            </Ctx.Consumer>
          );
        } else {
          return <Component {...this.props} />;
        }
      }
    }
    (WithDebug as any).displayName = `${Component.displayName}.WithDebug`;
    return WithDebug;
  } else {
    return Component;
  }
}
