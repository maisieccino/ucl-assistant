import React from "react";
import { LinearGradient } from "expo";
import { TouchableNativeFeedback } from "react-native";
import Colors from "../../constants/Colors";
import Styles from "../../styles/Button";
import { propTypes, defaultProps } from "./props";

const Button = ({ onPress, styles, children, disabled }) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackground()}
    onPress={e => setTimeout(onPress, 200, e)}
    useForeground
    style={Styles.buttonWrapper}
    disabled={disabled}
  >
    <LinearGradient
      colors={[Colors.accentColor, Colors.buttonBackground]}
      style={[Styles.button, styles]}
      start={[0, 1]}
      end={[1, 0]}
    >
      {children}
    </LinearGradient>
  </TouchableNativeFeedback>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
