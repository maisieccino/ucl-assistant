import React, { Component } from "react";
import { TouchableNativeFeedback, View } from "react-native";
import PropTypes from "prop-types";
import { CardTitleText } from "./Typography";
import Style from "../styles/Containers";

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
    const { title, children } = this.props;
    return (
      <TouchableNativeFeedback onPress={() => {}}>
        <View style={Style.card}>
          {title && <CardTitleText>{title}</CardTitleText>}
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default Card;
