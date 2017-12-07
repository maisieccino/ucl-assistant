import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { propTypes, defaultProps } from "./props";
import ActiveButton from "./ActiveButton";
import DisabledButton from "./DisabledButton";
import { ButtonText } from "../Typography";
import Colors from "../../constants/Colors";

class Button extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    let { children } = this.props;
    if (this.props.loading) {
      children = <ActivityIndicator size={24} color={Colors.pageBackground} />;
    }
    if (typeof children === "string") {
      children = <ButtonText>{children}</ButtonText>;
    }
    if (this.props.disabled) {
      return <DisabledButton {...this.props}>{children}</DisabledButton>;
    }
    return <ActiveButton {...this.props}>{children}</ActiveButton>;
  }
}

export default Button;
