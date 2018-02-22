import { StackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/SplashScreen";
import TimetableDetailScreen from "../screens/TimetableDetailScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    Splash: {
      screen: SplashScreen,
    },
    TimetableDetail: {
      screen: TimetableDetailScreen,
    },
    PersonDetail: {
      screen: PersonDetailScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal",
        fontFamily: "apercu",
      },
    }),
  },
);

export default RootStackNavigator;
