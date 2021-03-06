import React, { PureComponent } from "react";

export interface IStackProps {
  value: number;
  valueAdjustment?: number;
  debug?: boolean;
}

export default class Stack extends PureComponent<IStackProps> {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: this.props.value + (this.props.valueAdjustment || 0),
          backgroundColor: this.props.debug ? "#0077FF55" : undefined
        }}
      />
    );
  }
}
