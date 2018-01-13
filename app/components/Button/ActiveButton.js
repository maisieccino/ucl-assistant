import React from "react";
import { LinearGradient } from "expo";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import Styles from "../../styles/Button";
import { propTypes, defaultProps } from "./props";

const Wrapper = ({ children, onPress, disabled }) =>
  Platform.OS === "android" ? (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={e => setTimeout(onPress, 200, e)}
      useForeground
      style={Styles.buttonWrapper}
      disabled={disabled}
    >
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      style={{ backgroundColor: "transparent" }}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );

const Button = ({ onPress, styles, children, disabled }) => (
  <Wrapper onPress={onPress} disabled={disabled}>
    <LinearGradient
      colors={[Colors.accentColor, Colors.buttonBackground]}
      style={[Styles.button, styles]}
      start={[0, 1]}
      end={[1, 0]}
    >
      {children}
    </LinearGradient>
  </Wrapper>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
