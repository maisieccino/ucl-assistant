import React, { Component } from "react";
import { RefreshControl } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { generate } from "shortid";
import { fetchSeatInfos } from "../../actions/studyspacesActions";
import {
  TitleText,
  SubtitleText,
  CentredText,
  ErrorText,
} from "../../components/Typography";
import { MainTabPage } from "../../components/Containers";
import { TextInput } from "../../components/Input";
import Colors from "../../constants/Colors";
import StudySpaceSearchResult from "./StudySpaceResult";

class StudySpaceScreen extends Component {
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

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    token: PropTypes.string,
    fetchInfo: PropTypes.func,
  };

  static defaultProps = {
    studyspaces: [],
    token: "",
    fetchInfo: () => {},
  };

  static mapStateToProps = state => ({
    studyspaces: state.studyspaces.studyspaces,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    fetchInfo: (ids, token) => dispatch(fetchSeatInfos(token, ids)),
  });

  state = {
    loadedSeatInfo: false,
  };

  componentDidMount() {
    if (!this.state.loadedSeatInfo && this.props.token) {
      this.fetchSeatInfo();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loadedSeatInfo && nextProps.token) {
      this.fetchSeatInfo();
    }
  }

  fetchSeatInfo() {
    const ids = this.props.studyspaces.map(space => space.id);
    this.props.fetchInfo(ids, this.props.token);
    this.setState({ loadedSeatInfo: true });
  }

  render() {
    const { navigation, studyspaces } = this.props;
    const errorneousSpaces = studyspaces.filter(
      space => space.fetchSeatInfoError !== "",
    );
    errorneousSpaces.forEach(space => console.log(space.fetchSeatInfoError));
    const isLoading =
      !this.state.loadedSeatInfo ||
      this.props.studyspaces.reduce(
        (res, space) => res || space.isFetchingSeatInfo,
        false,
      );
    return (
      <MainTabPage
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => this.fetchSeatInfo()}
          />
        }
      >
        <TitleText>Find Study Spaces</TitleText>
        <TextInput placeholder="Search for a building name..." />
        <CentredText>Start typing to get search results</CentredText>

        <SubtitleText>Nearby Study Spaces</SubtitleText>
        {errorneousSpaces.length < 5 ? (
          errorneousSpaces.map(space => (
            <ErrorText key={generate()}>
              Error fetching {space.name}: {space.fetchSeatInfoError}
            </ErrorText>
          ))
        ) : (
          <ErrorText>
            Looks like there was an error trying to fetch live seating info.
          </ErrorText>
        )}

        {studyspaces.map(survey => (
          <StudySpaceSearchResult
            key={generate()}
            {...survey}
            onPress={() =>
              navigation.navigate("StudySpaceDetail", {
                id: survey.id,
                name: survey.name,
                capacity: survey.capacity,
                occupied: survey.occupied,
              })
            }
          />
        ))}
      </MainTabPage>
    );
  }
}

export default connect(
  StudySpaceScreen.mapStateToProps,
  StudySpaceScreen.mapDispatchToProps,
)(StudySpaceScreen);
