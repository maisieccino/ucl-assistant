/* eslint-disable react-native/no-inline-styles */
// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
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
        { time: 0, occupied: 128 },
        { time: 1, occupied: 69 },
        { time: 2, occupied: 46 },
        { time: 3, occupied: 43 },
        { time: 4, occupied: 21 },
        { time: 5, occupied: 32 },
        { time: 6, occupied: 34 },
        { time: 7, occupied: 40 },
        { time: 8, occupied: 85 },
        { time: 9, occupied: 103 },
        { time: 10, occupied: 100 },
        { time: 11, occupied: 250 },
        { time: 12, occupied: 562 },
        { time: 13, occupied: 600 },
        { time: 14, occupied: 596 },
        { time: 15, occupied: 634 },
        { time: 16, occupied: 620 },
        { time: 17, occupied: 610 },
        { time: 18, occupied: 598 },
        { time: 19, occupied: 612 },
        { time: 20, occupied: 408 },
        { time: 21, occupied: 312 },
        { time: 22, occupied: 333 },
        { time: 23, occupied: 304 },
      ],
    };
  }

  render() {
    const { name, capacity, data, occupied } = this.state;
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
        <CapacityChart data={data} />
        <BodyText>6:30pm - less busy than usual.</BodyText>
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
