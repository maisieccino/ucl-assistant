import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText, CentredText } from "../components/Typography";
import { MainTabPage } from "../components/Containers";
import { TextInput } from "../components/Input";
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
      <MainTabPage>
        <TitleText>People</TitleText>
        <TextInput placeholder="Search for a name or email..." />
        <CentredText>Start typing to get search results</CentredText>

        <SubtitleText>Recently Searched</SubtitleText>
      </MainTabPage>
    );
  }
}

export default TimetableScreen;
