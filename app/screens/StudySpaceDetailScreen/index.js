/* eslint-disable react-native/no-inline-styles */
// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import { Page, Horizontal } from "../../components/Containers";
import { BodyText, TitleText, SubtitleText } from "../../components/Typography";
import CapacityChart from "./CapacityChart";

class StudySpaceDetailScreen extends Component {
  static navigationOptions = {
    title: "Study Space Detail",
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    const { id, name, occupied, capacity } = this.props.navigation.state.params;
    this.state = {
      name,
      id,
      capacity,
      occupied,
      data: [
        128,
        69,
        46,
        43,
        21,
        32,
        34,
        40,
        85,
        103,
        100,
        250,
        562,
        600,
        596,
        634,
        620,
        610,
        598,
        612,
        408,
        312,
        333,
        304,
      ],
    };
  }

  render() {
    const { id, name, capacity, data, occupied } = this.state;
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
        <CapacityChart id={id} data={data} occupied={occupied} />
        <BodyText>{moment().format("HH:mm")} - less busy than usual.</BodyText>
        <SubtitleText>Facilities</SubtitleText>
        <BodyText>
          See the libraries website for more information about what facilities
          are offered.
        </BodyText>
      </Page>
    );
  }
}

export default StudySpaceDetailScreen;
