import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { MapView } from "expo";
import { generate } from "shortid";
import { fetchSeatInfo } from "../../actions/studyspacesActions";
import {
  TitleText,
  SubtitleText,
  CentredText,
} from "../../components/Typography";
import { MainTabPage } from "../../components/Containers";
import { TextInput } from "../../components/Input";
import Colors from "../../constants/Colors";
import MapStyle from "../../styles/Map";
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
    fetchInfo: (id, token) => dispatch(fetchSeatInfo(token, id)),
  });

  state = {
    loadedSeatInfo: false,
  };

  componentDidMount() {
    if (!this.state.loadedSeatInfo && this.props.token) {
      this.props.studyspaces.forEach(space => {
        this.props.fetchInfo(space.id, this.props.token);
      });
      this.state.loadedSeatInfo = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loadedSeatInfo && nextProps.token) {
      nextProps.studyspaces.forEach(space => {
        this.props.fetchInfo(space.id, nextProps.token);
      });
      this.setState({ loadedSeatInfo: true });
    }
  }

  render() {
    const { navigation, studyspaces } = this.props;
    return (
      <MainTabPage>
        <TitleText>Find Study Spaces</TitleText>
        <TextInput placeholder="Search for a building name..." />
        <CentredText>Start typing to get search results</CentredText>

        <SubtitleText>Nearby Study Spaces</SubtitleText>
        <MapView
          style={MapStyle.wideMap}
          initialRegion={{
            latitude: 51.5246586,
            longitude: -0.1339784,
            latitudeDelta: 0.0012,
            longitudeDelta: 0.0071,
          }}
        />
        {studyspaces.map(survey => (
          <StudySpaceSearchResult
            key={generate()}
            {...survey}
            onPress={() =>
              navigation.navigate("StudySpaceDetail", {
                id: survey.id,
                name: survey.name,
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
