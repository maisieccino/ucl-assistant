/* eslint react/prop-types: 0 */
import React from "react";
import { Feather } from "@expo/vector-icons";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Colors from "../constants/Colors";

import TimetableScreen from "../screens/TimetableScreen";
import StudySpacesScreen from "../screens/StudySpacesScreen";
import PeopleScreen from "../screens/PeopleScreen";
import RoomsScreen from "../screens/RoomsScreen";
import SettingsScreen from "../screens/SettingsScreen";

export default TabNavigator(
  {
    Timetable: {
      screen: TimetableScreen,
    },
    StudySpaces: {
      screen: StudySpacesScreen,
    },
    People: {
      screen: PeopleScreen,
    },
    Rooms: {
      screen: RoomsScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Timetable":
            iconName = "calendar";
            break;
          case "StudySpaces":
            iconName = "book";
            break;
          case "People":
            iconName = "users";
            break;
          case "Rooms":
            iconName = "map-pin";
            break;
          case "Settings":
            iconName = "settings";
            break;
          default:
            iconName = "info";
        }
        return (
          <Feather
            name={iconName}
            size={28}
            color={focused ? Colors.pageBackground : Colors.textColor}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.pageBackground,
      activeBackgroundColor: Colors.accentColor,
      inactiveTintColor: Colors.textColor,
      tabStyle: {
        paddingTop: 5,
        paddingBottom: 5,
      },
      labelStyle: {
        fontFamily: "apercu",
      },
      style: {
        height: 60,
      },
    },
  },
);
