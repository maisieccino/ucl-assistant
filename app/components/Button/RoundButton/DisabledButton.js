import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import Styles from "../../../styles/Button";
import { propTypes, defaultProps } from "./props";

const Button = ({ onPress, style, wrapperStyle, children, disabled }) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackground()}
    onPress={e => onPress(e)}
    useForeground
    style={[Styles.buttonWrapper, wrapperStyle]}
    disabled={disabled}
  >
    <View style={[Styles.roundButton, Styles.disabled, style]}>{children}</View>
  </TouchableNativeFeedback>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
