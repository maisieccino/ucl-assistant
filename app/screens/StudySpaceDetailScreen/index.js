/* eslint-disable react-native/no-inline-styles */
// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { fetchAverages } from "../../actions/studyspacesActions";
import { Page, Horizontal } from "../../components/Containers";
import { BodyText, TitleText, SubtitleText } from "../../components/Typography";
import CapacityChart from "./CapacityChart";

const busyText = (
  time = 0,
  data = Array.from(Array(24)).map(() => 0),
  occupied = 0,
  capacity = 1,
) => {
  const diff = data[time] - occupied;
  if (Math.abs(diff) / capacity < 0.05) {
    return "about as busy as normal";
  }
  if (diff > 0) {
    return "quieter than usual";
  }
  return "busier than usual";
};

class StudySpaceDetailScreen extends Component {
  static navigationOptions = {
    title: "Study Space Detail",
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    fetchAverages: PropTypes.func.isRequired,
    token: PropTypes.string,
  };

  static defaultProps = {
    studyspaces: [],
    token: "",
  };

  static mapStateToProps = state => ({
    studyspaces: state.studyspaces.studyspaces,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    fetchAverages: (token, id) => dispatch(fetchAverages(token, id)),
  });

  constructor(props) {
    super(props);
    const { id, name, occupied, capacity } = this.props.navigation.state.params;
    this.state = {
      name,
      id,
      capacity,
      occupied,
      data: Array.from(Array(24)).map(() => 0),
      fetchingData: false,
    };
  }

  componentDidMount() {
    if (!this.state.fetchingData && this.props.token.length > 0) {
      this.props.fetchAverages(this.props.token, this.state.id);
      setTimeout(() => this.setState({ fetchingData: true }), 100);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.fetchingData && nextProps.token.length > 0) {
      this.props.fetchAverages(nextProps.token, this.state.id);
      this.setState({ fetchingData: true });
    }
    if (nextProps.studyspaces.length > 0) {
      const space = nextProps.studyspaces.filter(
        s => s.id === this.state.id,
      )[0];
      this.setState({ data: space.dailyAverages });
    }
  }

  render() {
    const { id, name, data, capacity, occupied } = this.state;
    const hour = parseInt(moment().format("HH"), 10);
    return (
      <Page>
        <TitleText>{name}</TitleText>
        <Horizontal>
          <View style={{ flex: 1 }}>
            <TitleText>{capacity - occupied}</TitleText>
            <BodyText>Seats Available</BodyText>
          </View>
          <View style={{ flex: 1 }}>
            <TitleText>{occupied}</TitleText>
            <BodyText>Seats Occupied</BodyText>
          </View>
        </Horizontal>
        <SubtitleText>Live Status</SubtitleText>
        <CapacityChart
          id={id}
          data={data}
          occupied={occupied}
          capacity={capacity}
        />
        <BodyText>
          {moment().format("HH:mm")} -{" "}
          {busyText(hour, data, occupied, capacity)}
        </BodyText>
        <SubtitleText>Facilities</SubtitleText>
        <BodyText>
          See the libraries website for more information about what facilities
          are offered.
        </BodyText>
      </Page>
    );
  }
}

export default connect(
  StudySpaceDetailScreen.mapStateToProps,
  StudySpaceDetailScreen.mapDispatchToProps,
)(StudySpaceDetailScreen);
