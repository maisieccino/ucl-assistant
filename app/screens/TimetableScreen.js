import React, { Component } from "react";
import { TitleText, SubtitleText, BodyText } from "../components/Typography";
import Card from "../components/Card";
import { Page } from "../components/Containers";
import CustomButton from "../components/Button";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Page>
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>Today{"'"}s Timetable</SubtitleText>
        <Card title="COMP101P">
          <BodyText>09:00 AM - 10:00 AM</BodyText>
          <BodyText>Roberts Building G08</BodyText>
          <BodyText>Dr Graham Roberts</BodyText>
        </Card>
        <BodyText>You have no upcoming events.</BodyText>
        <SubtitleText>Find A Timetable</SubtitleText>
        <CustomButton>Test</CustomButton>
      </Page>
    );
  }
}

export default TimetableScreen;
