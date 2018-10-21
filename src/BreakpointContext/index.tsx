import React, { createContext, PureComponent } from "react";

export type BreakpointSelector<T> = () => T;
export interface IResizeEventSource {
  addEventListener(event: "resize" | "change", listener: () => void): void;
  removeEventListener(event: "resize" | "change", listener: () => void): void;
}

export class BreakpointContextValue<T> {
  public constructor(public readonly breakpoint: T) {}
}

export function createBreakpointContext<T>(
  resizeEventSource: IResizeEventSource,
  defaultSelector: BreakpointSelector<T>
) {
  const Context = createContext(new BreakpointContextValue(defaultSelector()));

  interface IProps {
    selector?: BreakpointSelector<T>;
  }

  interface IState {
    breakpoint: T;
  }

  // tslint:disable-next-line:max-classes-per-file
  class BreakpointProvider extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
      super(props);

      this.state = {
        breakpoint: (this.props.selector || defaultSelector)()
      };
    }

    public componentDidMount() {
      resizeEventSource.addEventListener("resize", this.onResize);
    }

    public componentWillUnmount() {
      resizeEventSource.removeEventListener("resize", this.onResize);
    }

    public render() {
      return (
        <Context.Provider
          value={new BreakpointContextValue(this.state.breakpoint)}
        >
          {this.props.children}
        </Context.Provider>
      );
    }

    private readonly onResize = () => {
      this.setState({ breakpoint: (this.props.selector || defaultSelector)() });
    };
  }

  (Context as any).displayName = "BreakpointContext";

  return {
    Provider: BreakpointProvider,
    Consumer: Context.Consumer
  };
}
