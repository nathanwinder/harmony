import * as React from "react";
import "./App.css";
import { createBreakpointContext } from "./BreakpointContext";
import { createDebugContext } from "./DebugContext";
import { createScaleContext } from "./scaling/ScaleContext";
import * as spaceing from "./spacing";

type Breakpoint = "mobile" | "tablet";
type LayoutScale = "xxs" | "xs" | "s" | "m" | "l" | "xl";
type LayoutScaleValues = { [key in LayoutScale]: number };

const layoutScale: LayoutScaleValues = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 16,
  l: 32,
  xl: 64
};

const layoutScaleTablet: LayoutScaleValues = {
  xxs: 4,
  xs: 8,
  s: 16,
  m: 32,
  l: 64,
  xl: 128
};

const DebugContext = createDebugContext();
const LayoutScaleContext = createScaleContext(layoutScale);
const BreakpointContext = createBreakpointContext<Breakpoint>(
  window,
  () => (window.innerWidth < 400 ? "mobile" : "tablet")
);

const { Inline, Stack, Inset } = spaceing.createSpaces(
  LayoutScaleContext,
  BreakpointContext.Consumer,
  DebugContext
);

const gutter: { [key in Breakpoint]: LayoutScale } = {
  mobile: "s",
  tablet: "l"
};

class App extends React.Component {
  public render() {
    return (
      <BreakpointContext.Provider>
        <BreakpointContext.Consumer>
          {bp => (
            <LayoutScaleContext.Provider
              value={{
                scale:
                  bp.breakpoint === "mobile" ? layoutScale : layoutScaleTablet
              }}
            >
              <DebugContext.Provider value={true}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    width: "100vw",
                    flex: 1
                  }}
                >
                  <Inset all="l">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flex: "1",
                        width: "100%"
                      }}
                    >
                      <Inline value={gutter} />
                      <span style={{ flex: 1, fontSize: 56 }}>a</span>
                      <Inline value={gutter} />
                      <span style={{ flex: 1, fontSize: 56 }}>b</span>
                      <Inline value={gutter} />
                    </div>
                    <Stack value="xl" />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flex: "1",
                        width: "100%"
                      }}
                    >
                      <Inline value={gutter} />
                      <span style={{ fontSize: 56 }}>c</span>
                      <Inline value={gutter} />
                      <span style={{ fontSize: 56 }}>d</span>
                      <Inline value={gutter} />
                    </div>
                  </Inset>
                </div>
              </DebugContext.Provider>
            </LayoutScaleContext.Provider>
          )}
        </BreakpointContext.Consumer>
        )}
      </BreakpointContext.Provider>
    );
  }
}

export default App;
