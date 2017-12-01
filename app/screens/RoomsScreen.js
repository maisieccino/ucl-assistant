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
        name="map-pin"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
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
