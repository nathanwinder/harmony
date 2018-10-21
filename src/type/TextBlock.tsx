import React, { CSSProperties, PureComponent } from "react";

export interface ITextBlockProps {
  size: number;
  lineHeight: number;
  style?: CSSProperties;
}

export default class TextBlock extends PureComponent<ITextBlockProps> {
  public render(): React.ReactNode {
    return (
      <span
        style={{
          ...this.props.style,
          fontSize: this.props.size,
          display: "block"
        }}
      >
        {this.props.children}
      </span>
    );
  }
}
