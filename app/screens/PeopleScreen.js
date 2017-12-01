import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText } from "../components/Typography";
import { Page } from "../components/Containers";
import Colors from "../constants/Colors";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="users"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
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
