import React, { Component } from "react";
import { TitleText, SubtitleText, BodyText } from "../components/Typography";
import { Page } from "../components/Containers";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Page>
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>Today{"'"}s Timetable</SubtitleText>
        <BodyText>You have no upcoming events.</BodyText>
        <SubtitleText>Find A Timetable</SubtitleText>
      </Page>
    );
  }
}

export default TimetableScreen;
