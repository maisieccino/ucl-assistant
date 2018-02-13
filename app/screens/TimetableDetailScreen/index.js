import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Location, Permissions } from "expo";
import TimetableDetailView from "./TimetableDetailView";

class TimetableDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Event: ${navigation.state.params.code}`,
  });

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    timetable: PropTypes.shape(),
  };

  static defaultProps = {
    timetable: {},
  };

  static mapStateToProps = state => ({
    timetable: state.timetable.timetable,
  });

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const { date = "2018-01-01", time, code } = params;
    this.state = {
      // pre-defined
      date,
      time,
      code,
      latitude: 51.5246586,
      longitude: -0.1339784,
      // from timetable
      event: {},
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.timetable).length > 0) {
      this.findEvent(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.timetable).length > 0) {
      this.findEvent(nextProps);
    }
  }

  async getLocationCoords(location) {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status === "undetermined") {
      const { status: res } = await Permissions.askAsync(Permissions.LOCATION);
      if (res === "denied") {
        return;
      }
    }
    if (status === "denied") {
      return;
    }
    const address = location.join(",");
    const result = await Location.geocodeAsync(address);
    await this.setState({
      latitude: result[0].latitude,
      longitude: result[0].longitude,
    });
  }

  async findEvent(props) {
    const { timetable } = props;
    const { date, time, code } = this.state;
    const timetableDay = (timetable[date] || {}).timetable || [];
    const event = timetableDay.filter(
      ev => ev.module.module_id === code && ev.start_time === time,
    )[0];
    await this.setState({ event });
    await this.getLocationCoords(event.location.address);
  }

  render() {
    const { latitude, longitude } = this.state;
    const initialRegion = {
      latitude: 51.5246586,
      longitude: -0.1339784,
      latitudeDelta: 0.0012,
      longitudeDelta: 0.0071,
    };
    return (
      <TimetableDetailView
        latitude={latitude}
        longitude={longitude}
        initialRegion={initialRegion}
        {...this.state.event}
      />
    );
  }
}

export default connect(TimetableDetailScreen.mapStateToProps)(
  TimetableDetailScreen,
);
