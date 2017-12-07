import React, { Component } from "react";
import { propTypes, defaultProps } from "./props";
import ActiveButton from "./ActiveButton";
import DisabledButton from "./DisabledButton";

class Button extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    return this.props.disabled ? (
      <DisabledButton {...this.props} />
    ) : (
      <ActiveButton {...this.props} />
    );
  }
}

export default Button;
