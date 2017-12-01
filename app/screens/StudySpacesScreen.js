import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText } from "../components/Typography";
import { Page } from "../components/Containers";
import Colors from "../constants/Colors";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Study Spaces",
    tabBarIcon: ({ focused }) => (
      <Feather
        name="book"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
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
