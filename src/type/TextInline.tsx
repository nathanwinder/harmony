import React, { CSSProperties, PureComponent } from "react";

export interface ITextInlineProps {
  size: number;
  lineHeight: number;
  style?: CSSProperties;
}

export default class TextInline extends PureComponent<ITextInlineProps> {
  public render(): React.ReactNode {
    return (
      <span
        style={{
          ...this.props.style,
          fontSize: this.props.size,
          display: "inline"
        }}
      >
        {this.props.children}
      </span>
    );
  }
}
