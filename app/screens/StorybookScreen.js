import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import StorybookUI from "../storybook";

class StorybookScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Playbook",
    tabBarIcon: ({ focused }) => (
      <Feather
        name="layers"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  render() {
    return <StorybookUI />;
  }
}

export default StorybookScreen;
