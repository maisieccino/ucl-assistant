import React, { Component } from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { BodyText, CardTitleText } from "../Typography";
import Style from "../../styles/Containers";

const Wrapper = ({ children, onPress }) =>
  Platform.OS === "android" ? (
    <TouchableNativeFeedback onPress={onPress}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  );

Wrapper.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};

Wrapper.defaultProps = {
  children: "",
  onPress: () => {},
};

class Card extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
  };

  static defaultProps = {
    children: "",
    title: "",
  };

  render() {
    let { children } = this.props;
    const { title } = this.props;
    if (typeof children === "string") {
      children = <BodyText>{children}</BodyText>;
    }
    return (
      <Wrapper onPress={() => {}}>
        <View style={Style.card}>
          {title && <CardTitleText>{title}</CardTitleText>}
          {children}
        </View>
      </Wrapper>
    );
  }
}

export default Card;
