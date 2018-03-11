import React, { Component } from "react";
import { FlatList, RefreshControl } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { momentObj } from "react-moment-proptypes";
import { Feather } from "@expo/vector-icons";
import { generate } from "shortid";
import { fetchSeatInfos } from "../../actions/studyspacesActions";
import {
  TitleText,
  SubtitleText,
  CentredText,
  ErrorText,
  BodyText,
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
    lastUpdated: PropTypes.oneOfType([momentObj, PropTypes.string]),
  };

  static defaultProps = {
    studyspaces: [],
    token: "",
    fetchInfo: () => {},
    lastUpdated: null,
  };

  static mapStateToProps = state => ({
    studyspaces: state.studyspaces.studyspaces,
    lastUpdated: state.studyspaces.lastStatusUpdate,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    fetchInfo: (ids, token) => dispatch(fetchSeatInfos(token, ids)),
  });

  constructor(props) {
    super(props);
    this.updateTextInterval = null;
  }

  state = {
    loadedSeatInfo: false,
    lastUpdated: "never",
  };

  componentDidMount() {
    if (!this.state.loadedSeatInfo && this.props.token) {
      this.fetchSeatInfo();
    }
    this.updateTextInterval = setInterval(
      () => this.updateLastUpdatedText(),
      10000,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loadedSeatInfo && nextProps.token) {
      this.fetchSeatInfo();
    }
    this.updateLastUpdatedText();
  }

  updateLastUpdatedText() {
    const { lastUpdated } = this.props;
    this.setState({
      lastUpdated: lastUpdated ? moment(lastUpdated).fromNow() : "never",
    });
  }

  async fetchSeatInfo() {
    await this.setState({ loadedSeatInfo: true });
    const ids = this.props.studyspaces.map(space => space.id);
    this.props.fetchInfo(ids, this.props.token);
  }

  render() {
    const { navigation, studyspaces } = this.props;
    const errorneousSpaces = studyspaces.filter(
      space => space.fetchSeatInfoError !== "",
    );
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

        <SubtitleText>All Study Spaces</SubtitleText>
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

        <BodyText>Last updated: {this.state.lastUpdated}</BodyText>

        <FlatList
          data={studyspaces}
          keyExtractor={item => item.id}
          initialNumToRender={30}
          renderItem={({ item }) => (
            <StudySpaceSearchResult
              {...item}
              onPress={() =>
                navigation.navigate("StudySpaceDetail", {
                  id: item.id,
                  name: item.name,
                  capacity: item.capacity,
                  occupied: item.occupied,
                })
              }
            />
          )}
        />
      </MainTabPage>
    );
  }
}

export default connect(
  StudySpaceScreen.mapStateToProps,
  StudySpaceScreen.mapDispatchToProps,
)(StudySpaceScreen);
