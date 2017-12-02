import React, { Component } from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText, BodyText } from "../components/Typography";
import Card from "../components/Card";
import { Page } from "../components/Containers";
import CustomButton from "../components/Button";
import Colors from "../constants/Colors";

class TimetableScreen extends Component {
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
      <Page>
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>Today{"'"}s Timetable</SubtitleText>
        <Card title="COMP101P">
          <BodyText>09:00 AM - 10:00 AM</BodyText>
          <BodyText>Roberts Building G08</BodyText>
          <BodyText>Dr Graham Roberts</BodyText>
        </Card>
        <Card title="COMP101P">
          <BodyText>09:00 AM - 10:00 AM</BodyText>
          <BodyText>Roberts Building G08</BodyText>
          <BodyText>Dr Graham Roberts</BodyText>
        </Card>
        <Card title="COMP101P">
          <BodyText>09:00 AM - 10:00 AM</BodyText>
          <BodyText>Roberts Building G08</BodyText>
          <BodyText>Dr Graham Roberts</BodyText>
        </Card>
        <BodyText>You have no upcoming events.</BodyText>
        <SubtitleText>Find A Timetable</SubtitleText>
        <CustomButton
          onPress={() => {
            setTimeout(() => navigate("Splash"), 200);
          }}
        >
          Test
        </CustomButton>
      </Page>
    );
  }
}

export default TimetableScreen;
