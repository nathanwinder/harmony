import { Consumer, Context } from "react";
import { BreakpointContextValue } from "src/BreakpointContext";
import withBreakpoints, {
  IWithBreakpointProps,
  IWithBreakpoints
} from "src/BreakpointContext/withBreakpoints";
import { DebugContext, IWithDebug, withDebug } from "src/DebugContext";
import { IScale, IScaleContextValue } from "src/scaling/ScaleContext";
import withScales, {
  IWithScale,
  IWithScaleProps
} from "src/scaling/withScales";
import Inline, { IInlineProps } from "./Inline";
import Inset, { IInsetProps } from "./Inset";
import Stack, { IStackProps } from "./Stack";

export { Inline, Inset, Stack };

export function createSpaces<T extends IScale, S extends keyof T>(
  scaleContext: Context<IScaleContextValue<T>>
): {
  Inline: IWithScale<IInlineProps, Extract<S, string>, "value">;
  Stack: IWithScale<IStackProps, Extract<S, string>, "value">;
  Inset: IWithScale<
    IInsetProps,
    Extract<S, string>,
    "all" | "vertical" | "horizontal" | "top" | "left" | "right" | "bottom"
  >;
};

export function createSpaces<
  B extends string,
  T extends IScale,
  S extends keyof T
>(
  scaleContext: Context<IScaleContextValue<T>>,
  breakpointContext: Consumer<BreakpointContextValue<B>>
): {
  Inline: IWithBreakpoints<
    IWithScaleProps<IInlineProps, Extract<S, string>, "value">,
    B,
    "value"
  >;
  Stack: IWithBreakpoints<
    IWithScaleProps<IStackProps, Extract<S, string>, "value">,
    B,
    "value"
  >;
  Inset: IWithBreakpoints<
    IWithScaleProps<
      IInsetProps,
      Extract<S, string>,
      "all" | "vertical" | "horizontal" | "top" | "left" | "right" | "bottom"
    >,
    B,
    "all" | "vertical" | "horizontal" | "top" | "left" | "right" | "bottom"
  >;
};

export function createSpaces<
  B extends string,
  T extends IScale,
  S extends keyof T
>(
  scaleContext: Context<IScaleContextValue<T>>,
  breakpointContext: Consumer<BreakpointContextValue<B>>,
  debugContext: DebugContext
): {
  Inline: IWithDebug<
    IWithBreakpointProps<
      IWithScaleProps<IInlineProps, Extract<S, string>, "value">,
      B,
      "value"
    >
  >;
  Stack: IWithDebug<
    IWithBreakpointProps<
      IWithScaleProps<IStackProps, Extract<S, string>, "value">,
      B,
      "value"
    >
  >;
  Inset: IWithDebug<
    IWithBreakpointProps<
      IWithScaleProps<
        IInsetProps,
        Extract<S, string>,
        "all" | "vertical" | "horizontal" | "top" | "left" | "right" | "bottom"
      >,
      B,
      "all" | "vertical" | "horizontal" | "top" | "left" | "right" | "bottom"
    >
  >;
};

export function createSpaces<T extends IScale, S extends keyof T>(
  scaleContext: Context<IScaleContextValue<T>>,
  debugContext: DebugContext
): {
  Inline: IWithDebug<
    IWithScaleProps<IInlineProps, Extract<S, string>, "value">
  >;
  Stack: IWithDebug<IWithScaleProps<IStackProps, Extract<S, string>, "value">>;
  Inset: IWithDebug<
    IWithScaleProps<
      IInsetProps,
      Extract<S, string>,
      "all" | "vertical" | "horizontal" | "top" | "left" | "right" | "bottom"
    >
  >;
};

export function createSpaces<B extends string, T extends IScale>(
  scaleContext: Context<IScaleContextValue<T>>,
  contextA?: DebugContext | Consumer<BreakpointContextValue<B>>,
  contextB?: DebugContext
) {
  const extend = <P, K extends keyof P>(
    component: React.ComponentType<P>,
    ...props: K[]
  ) => {
    if (contextA && contextB) {
      return withDebug(
        withBreakpoints(
          withScales(component, scaleContext, ...props),
          contextA as Consumer<BreakpointContextValue<B>>,
          ...props
        ),
        contextB
      );
    }

    if (contextA && isDebugContext(contextA)) {
      return withDebug(withScales(component, scaleContext, ...props), contextA);
    }

    return withScales(component, scaleContext, ...props);
  };

  return {
    Inline: extend(Inline, "value"),
    Stack: extend(Stack, "value"),
    Inset: extend(
      Inset,
      "all",
      "vertical",
      "horizontal",
      "top",
      "left",
      "right",
      "bottom"
    )
  };
}

function isDebugContext(x: any): x is DebugContext {
  return x.enabled !== undefined;
}
