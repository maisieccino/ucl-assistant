import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText, CentredText } from "../components/Typography";
import { Page } from "../components/Containers";
import { TextInput } from "../components/Input";
import Colors from "../constants/Colors";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="map-pin"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  render() {
    return (
      <Page mainTabPage>
        <TitleText>Rooms</TitleText>
        <TextInput placeholder="Search for a room or building name..." />
        <CentredText>Start typing to get search results</CentredText>
        <SubtitleText>Your Favourites</SubtitleText>
        <SubtitleText>In Roberts Building</SubtitleText>
      </Page>
    );
  }
}

export default TimetableScreen;
