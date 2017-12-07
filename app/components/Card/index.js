import React, { Component } from "react";
import { TouchableNativeFeedback, View } from "react-native";
import PropTypes from "prop-types";
import { BodyText, CardTitleText } from "../Typography";
import Style from "../../styles/Containers";

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
