import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText, BodyText } from "../components/Typography";
import TimetableCard from "../components/Card/TimetableCard";
import { MainTabPage } from "../components/Containers";
import Button from "../components/Button";
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
    user: PropTypes.shape(),
  };

  static defaultProps = {
    user: {},
  };

  static mapStateToProps = state => ({
    user: state.user,
  });

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;
    return (
      <MainTabPage>
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>Today{"'"}s Timetable</SubtitleText>
        <TimetableCard
          moduleCode="COMP101P"
          startTime={new Date().toISOString()}
          endTime={new Date().toISOString()}
          location="TBA"
          lecturer="Unknown Lecturer"
        />
        <BodyText>You have no upcoming events.</BodyText>
        <SubtitleText>Find A Timetable</SubtitleText>
        <Button onPress={() => navigate("Splash")}>Test</Button>
        <BodyText>{JSON.stringify(user, "\n", 3)}</BodyText>
      </MainTabPage>
    );
  }
}

export default connect(TimetableScreen.mapStateToProps)(TimetableScreen);
