import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import { generate } from "shortid";
import { fetchTimetable } from "../actions/timetableActions";
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
    timetable: PropTypes.shape(),
    error: PropTypes.string,
    fetchTimetable: PropTypes.func,
  };

  static defaultProps = {
    user: {},
    timetable: {},
    error: "",
    fetchTimetable: () => {},
  };

  static mapStateToProps = state => ({
    user: state.user,
    timetable: state.timetable.timetable,
    error: state.timetable.error,
  });

  static mapDispatchToProps = dispatch => ({
    fetchTimetable: (token, date) => dispatch(fetchTimetable(token, date)),
  });

  constructor(props) {
    super(props);
    this.state = {
      endpoint: "/useritem.start_time",
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
    const { user, timetable } = this.props;
    const { token } = user;
    const dateString = this.state.date.format("dddd, Do MMMM");
    const dateISO = this.state.date.format("YYYY-MM-DD");
    const filteredTimetable = timetable[dateISO] || [];
    return (
      <MainTabPage>
        <TitleText>Your Timetable</TitleText>
        <SubtitleText>{dateString}</SubtitleText>
        {filteredTimetable.map(item => (
          <TimetableCard
            moduleName={item.module.name}
            moduleCode={item.module.module_id}
            startTime={`${dateISO} ${item.start_time}`}
            endTime={`${dateISO} ${item.end_time}`}
            location={item.location.name || "TBA"}
            lecturer={item.lecturer ? item.lecturer.name : "Unknown Lecturer"}
            key={generate()}
          />
        ))}
        <Horizontal>
          <Button
            onPress={() =>
              this.setState({ date: this.state.date.subtract(1, "days") })
            }
          >
            Yesterday
          </Button>
          <Button
            onPress={() => this.props.fetchTimetable(token, this.state.date)}
          >
            Fetch
          </Button>
          <Button
            onPress={() =>
              this.setState({ date: this.state.date.add(1, "days") })
            }
          >
            Tomorrow
          </Button>
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

export default connect(
  TimetableScreen.mapStateToProps,
  TimetableScreen.mapDispatchToProps,
)(TimetableScreen);
