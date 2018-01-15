import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import { MapView } from "expo";
import { TitleText, SubtitleText, CentredText } from "../components/Typography";
import { MainTabPage } from "../components/Containers";
import { TextInput } from "../components/Input";
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
      <MainTabPage>
        <TitleText>Find Study Spaces</TitleText>
        <TextInput placeholder="Search for a building name..." />
        <CentredText>Start typing to get search results</CentredText>

        <SubtitleText>Nearby Study Spaces</SubtitleText>
        <MapView
          style={{
            height: 200,
            marginLeft: -20,
            marginRight: -20,
            marginTop: 10,
            marginBottom: 10,
          }}
          initialRegion={{
            latitude: 51.5246586,
            longitude: -0.1339784,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0071,
          }}
        />
      </MainTabPage>
    );
  }
}

export default TimetableScreen;
