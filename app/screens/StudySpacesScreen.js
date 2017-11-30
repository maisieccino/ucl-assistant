import React, { Component } from "react";
import { TitleText, SubtitleText } from "../components/Typography";
import { Page } from "../components/Containers";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Study Spaces",
  };

  render() {
    return (
      <Page>
        <TitleText>Find Study Spaces</TitleText>
        <SubtitleText>Nearby</SubtitleText>
      </Page>
    );
  }
}

export default TimetableScreen;
