import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableNativeFeedback, View } from "react-native";
import { ButtonText } from "./Typography";
import Styles from "../styles/Button";

class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    styles: View.propTypes.style,
    children: PropTypes.node,
  };

  static defaultProps = {
    onPress: () => {},
    styles: {},
    children: "",
  };

  render() {
    const { onPress, styles, children } = this.props;
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={e => onPress(e)}
      >
        <View style={[Styles.button, styles]}>
          <ButtonText>{children}</ButtonText>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default Button;
