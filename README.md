# Harmony

:exclamation:`This project is in alpha and has not yet been packaged for distribution via NPM. That is coming soon. In the mean time I'd love your feedback.`

Harmony was inspired by Nathan Curtis' blog post "[Space in Design Systems](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)". Nathan covers three primary elements of whitespace: inset, stack, and inline. He goes on to suggest developers should size whitespace useing a harmonious scale named using t-shirt sizes. This enables developers to quickly layout an application without constantly asking the question "Does this margin look right?"

This idea has been adapted to this React/React-Native TypeScript library and has been enhanced to support breakpoints, debugging, and HOCs to add scaling to any component.

## Quick Samples

Setting the stack whitespace to medium.

```html
<div>
  <h1>Hello World</h1>
  <Stack value="m"/>
  <p>There is additional whitespace between the title and paragraph.</p>
</div>
```

Setting the stack whitesplace to medium at the mobile breakpoint and large at the tablet breakpoint.

```html
<div>
  <h1>Hello World</h1>
  <Stack value={{mobile: "m", tablet: "l"}}/>
  <p>There is additional whitespace between the title and paragraph.</p>
</div>
```

Colors the whitespace element to make it easier to debug layout issues.

```html
<div>
  <h1>Hello World</h1>
  <Stack value="m" debug={true}/>
  <p>There is additional whitespace between the title and paragraph.</p>
</div>
```

## Feature Overview

1. Use Inline, Stack, and Inset to layout whitespace
2. Set "size" of whitespace using number (`value={10}`), scale (`value="m"`), or in respones to breakpoints (`value={{ mobile: 10, tablet: "xxl" }}`).
3. Apply adjustments to fine-tune layouts: `<Inline value="m" valueAdjustment={-2}>`
4. Specify the scale that make sence for your app: `type MyScale = "xs" | "s" | "m" | "l" | "xl`,
5. Specify the breakpoints for your app: `type MyBreakpoints = "mobile" | "tablet" | "desktop"`
6. Breakpoints, Scale, and Debug utilize the React Context Api so you have full control of when and how these components are used. For example you can apply different scales to different parts of the app. Or change the screen sizes at which breakpoints hit for differnt component trees.
7. Use debug "Context" to turn debug on/off for trees of components
8. Set debug on/off for individual components overriding the debug context setting.
9. Utilize simple Higher Order Components (HOC) to add Breakpoint, Scale, or Debug behvior to third-party components.

## Future Features

1. Text components that clear leading and trailing margins to enable more consistent layout.
2. Scale for Text components.

## Contributing

If you are interested in contributing let me know. This project is in the early stages so there are not formal processes yet.
