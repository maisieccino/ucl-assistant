import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import { TitleText, SubtitleText, BodyText } from "../components/Typography";
import TimetableCard from "../components/Card/TimetableCard";
import { MainTabPage, Horizontal } from "../components/Containers";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { API_URL } from "../constants/API";
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

  constructor(props) {
    super(props);
    this.state = {
      endpoint: "/user",
      date: moment(),
    };
  }

  async authenticate() {
    const { token } = this.props.user;
    if (!token) {
      Alert.alert("Not signed in", "You're not signed in.");
    }
    const res = await fetch(`${API_URL}${this.state.endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Alert.alert(
      `Response code: ${res.status}`,
      `body: ${JSON.stringify(await res.json(), "\n", 2)}`,
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.props;
    const dateString = this.state.date.format("dddd, Mo MMMM");
    return (
      <MainTabPage>
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>{dateString}</SubtitleText>
        <TimetableCard
          moduleCode="COMP101P"
          startTime={new Date().toISOString()}
          endTime={new Date().toISOString()}
          location="TBA"
          lecturer="Unknown Lecturer"
        />
        <Horizontal>
          <Button>Yesterday</Button>
          <Button>Tomorrow</Button>
        </Horizontal>
        <SubtitleText>Find A Timetable</SubtitleText>
        <Button onPress={() => navigate("Splash")}>Test</Button>
        <TextInput
          onChangeText={endpoint => this.setState({ endpoint })}
          value={this.state.endpoint}
        />
        <Button onPress={() => this.authenticate()}>Test Authentication</Button>
        <BodyText>{JSON.stringify(user, "\n", 3)}</BodyText>
      </MainTabPage>
    );
  }
}

export default connect(TimetableScreen.mapStateToProps)(TimetableScreen);
