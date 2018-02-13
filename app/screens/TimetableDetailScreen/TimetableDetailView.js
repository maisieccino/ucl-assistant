import React from "react";
import PropTypes from "prop-types";
import { Linking } from "react-native";
import { MapView } from "expo";
import moment from "moment";
import { TitleText, SubtitleText, BodyText } from "../../components/Typography";
import Button from "../../components/Button";
import { Page } from "../../components/Containers";
import MapStyle from "../../styles/Map";

const TimetableDetailView = props => {
  let contactTypeStr = "";
  const sessionType = props.session_type_str.toLowerCase();
  switch (true) {
    case sessionType === "lecture":
    case sessionType === "seminar": {
      contactTypeStr = "Lecturer";
      break;
    }
    case sessionType === "practical":
    case sessionType === "problem based learning": {
      contactTypeStr = "Instructor";
      break;
    }
    default: {
      contactTypeStr = "Contact";
    }
  }

  const { latitude, longitude } = props;

  return (
    <Page>
      <TitleText>{props.module.name}</TitleText>
      <BodyText>{moment(props.date).format("dddd, Do MMMM")}</BodyText>
      <BodyText>
        {props.start_time} - {props.end_time}
      </BodyText>
      <BodyText>{props.location.name}</BodyText>
      <BodyText>Type: {props.session_type_str}</BodyText>
      {props.session_group.length > 0 && (
        <BodyText>Group {props.session_group}</BodyText>
      )}
      <MapView
        style={MapStyle.wideMap}
        initialRegion={props.initialRegion}
        region={{
          latitude,
          longitude,
          latitudeDelta: props.initialRegion.latitudeDelta,
          longitudeDelta: props.initialRegion.longitudeDelta,
        }}
      >
        <MapView.Marker coordinate={{ latitude, longitude }} />
      </MapView>
      <Button
        onPress={() =>
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${props.location.address.join()}`,
          )
        }
      >
        Directions
      </Button>

      <SubtitleText>{contactTypeStr}</SubtitleText>
      <BodyText>{props.contact}</BodyText>
      <Button>Details</Button>

      {__DEV__ && <SubtitleText>Debug Information</SubtitleText>}
      {__DEV__ && <BodyText>{JSON.stringify(props, "\n", 2)}</BodyText>}
    </Page>
  );
};

TimetableDetailView.propTypes = {
  date: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  contact: PropTypes.string,
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.arrayOf(PropTypes.string),
  }),
  module: PropTypes.shape({
    name: PropTypes.string,
    lecturer: PropTypes.shape({
      department_id: PropTypes.string,
      department_name: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  session_type_str: PropTypes.string,
  session_group: PropTypes.string,
};

TimetableDetailView.defaultProps = {
  date: "2017-01-01",
  latitude: 51.5246586,
  longitude: -0.1339784,
  start_time: "",
  end_time: "",
  contact: "",
  location: {
    name: "",
    address: [],
  },
  module: {
    name: "",
    lecturer: {
      department_id: "",
      department_name: "",
      email: "",
      name: "",
    },
  },
  session_type_str: "",
  session_group: "",
};

export default TimetableDetailView;
