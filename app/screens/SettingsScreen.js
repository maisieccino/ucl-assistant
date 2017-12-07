import React, { Component } from "react";
import { TitleText } from "../components/Typography";
import { MainTabPage } from "../components/Containers";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <MainTabPage>
        <TitleText>Settings</TitleText>
      </MainTabPage>
    );
  }
}

export default TimetableScreen;
