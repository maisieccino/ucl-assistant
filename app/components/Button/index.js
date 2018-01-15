import React, { Component } from "react";
import { ActivityIndicator, Platform } from "react-native";
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
    const buttonSize = Platform.OS === "android" ? 24 : 1;
    if (this.props.loading) {
      children = (
        <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
      );
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
export { default as RoundButton } from "./RoundButton";
