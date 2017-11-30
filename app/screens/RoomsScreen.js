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
        <TitleText>Rooms</TitleText>
        <SubtitleText>Your Favourites</SubtitleText>
        <SubtitleText>In Roberts Building</SubtitleText>
      </Page>
    );
  }
}

export default TimetableScreen;
