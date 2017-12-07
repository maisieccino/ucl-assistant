import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText, BodyText } from "../components/Typography";
import Card from "../components/Card";
import { MainTabPage } from "../components/Containers";
import CustomButton from "../components/Button";
import Colors from "../constants/Colors";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem("@UCLAssistant:user");
      this.state.user = JSON.parse(user);
    } catch (err) {
      this.state.user = {};
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.state;
    return (
      <MainTabPage>
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>Today{"'"}s Timetable</SubtitleText>
        <Card title="COMP101P">
          <BodyText>09:00 AM - 10:00 AM</BodyText>
          <BodyText>Roberts Building G08</BodyText>
          <BodyText>Dr Graham Roberts</BodyText>
        </Card>
        <Card title="COMP101P">
          <BodyText>09:00 AM - 10:00 AM</BodyText>
          <BodyText>Roberts Building G08</BodyText>
          <BodyText>Dr Graham Roberts</BodyText>
        </Card>
        <Card title="COMP101P">
          <BodyText>09:00 AM - 10:00 AM</BodyText>
          <BodyText>Roberts Building G08</BodyText>
          <BodyText>Dr Graham Roberts</BodyText>
        </Card>
        <BodyText>You have no upcoming events.</BodyText>
        <SubtitleText>Find A Timetable</SubtitleText>
        <CustomButton
          onPress={() => {
            setTimeout(() => navigate("Splash"), 200);
          }}
        >
          Test
        </CustomButton>
        <BodyText>{JSON.stringify(user, "\n", 2)}</BodyText>
      </MainTabPage>
    );
  }
}

export default TimetableScreen;
