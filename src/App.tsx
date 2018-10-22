import * as React from "react";
import format from "string-format";
import "./App.css";
import { createBreakpointContext } from "./BreakpointContext";
import { createDebugContext } from "./DebugContext";
import { createLocalizationContext } from "./localization";
import { ILocalizationDictionary } from "./localization/ILocalizationDictionary";
import { ILocalizationDictionaryProvider } from "./localization/ILocalizationDictionaryProvider";
import { withLocalization } from "./localization/withLocalization";
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

const english: ILocalizationDictionary = {
  Hello: {
    language: "en",
    locale: undefined,
    phrase: "Hello"
  },
  World: {
    language: "en",
    locale: undefined,
    phrase: "World"
  },
  "Format {0}": {
    language: "en",
    locale: undefined,
    phrase: "Format {0}"
  },
  String: {
    language: "en",
    locale: undefined,
    phrase: "String"
  }
};

const spanish: ILocalizationDictionary = {
  Hello: {
    language: "es",
    locale: undefined,
    phrase: "Hola"
  },
  World: {
    language: "es",
    locale: undefined,
    phrase: "Mundo"
  },
  "Format {0}": {
    language: "es",
    locale: undefined,
    phrase: "{0} de formato"
  },
  String: {
    language: "es",
    locale: undefined,
    phrase: "Cadena"
  }
};

const provider: ILocalizationDictionaryProvider = {
  getDictionary: language => {
    switch (language) {
      case "en":
        return english;
      case "es":
        return spanish;
      default:
        return english;
    }
  }
};

const LocalizationContext = createLocalizationContext(
  "en",
  undefined,
  (l, p, a) => format(p, a.map((v: any) => l.localize(v))),
  provider,
  undefined
);

const Text = withLocalization(
  (props: { children: any }) => <span>{props.children}</span>,
  LocalizationContext,
  "children"
);

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
      <LocalizationContext.Provider language="es">
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
                    <Inset all="m">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flex: "1",
                          width: "100%"
                        }}
                      >
                        <Inline value={gutter} />
                        <span style={{ flex: 1, fontSize: 56 }}>
                          <Text>Hello</Text>
                        </span>
                        <Inline value={gutter} />
                        <span style={{ flex: 1, fontSize: 56 }}>
                          <Text>World</Text>
                        </span>
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
                        <span style={{ fontSize: 56 }}>
                          <Text>
                            {{ phrase: "Format {0}", args: ["String"] }}
                          </Text>
                        </span>
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
        </BreakpointContext.Provider>
      </LocalizationContext.Provider>
    );
  }
}

export default App;
