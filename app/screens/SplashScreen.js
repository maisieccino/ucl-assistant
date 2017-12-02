import React, { Component } from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { TitleText, BodyText } from "../components/Typography";
import { PageNoScroll, Spacer } from "../components/Containers";
import CustomButton from "../components/Button";
import Colors from "../constants/Colors";

class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <PageNoScroll>
        <TitleText>UCL Assistant</TitleText>
        <BodyText>One app to manage your life at UCL.</BodyText>
        <Spacer />
        <CustomButton>Sign In With UCL</CustomButton>
      </PageNoScroll>
    );
  }
}

export default SplashScreen;
