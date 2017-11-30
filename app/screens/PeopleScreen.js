import React, { Component } from "react";
import { TitleText, SubtitleText } from "../components/Typography";
import { Page } from "../components/Containers";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Page>
        <TitleText>People</TitleText>
        <SubtitleText>Recently Searched</SubtitleText>
      </Page>
    );
  }
}

export default TimetableScreen;
