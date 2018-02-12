import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import Card from "./";
import { BodyText } from "../Typography";

const TimetableCard = ({
  moduleName,
  moduleCode,
  startTime,
  endTime,
  location,
  lecturer,
  navigation,
}) => {
  const start = moment(startTime).format("HH:mma");
  const end = moment(endTime).format("HH:mma");
  return (
    <Card
      title={moduleCode}
      onPress={() =>
        navigation.navigate("TimetableDetail", {
          date: moment(startTime).format("YYYY-MM-DD"),
          time: moment(startTime).format("HH:mm"),
          module: moduleName,
          code: moduleCode,
        })
      }
    >
      <BodyText>{moduleName}</BodyText>
      <BodyText>
        <Feather name="clock" /> {start} - {end}
      </BodyText>
      <BodyText>
        <Feather name="map-pin" /> {location}
      </BodyText>
      <BodyText>
        <Feather name="user" />{" "}
        {lecturer === "unknown" ? "Unknown Lecturer" : lecturer}
      </BodyText>
    </Card>
  );
};

TimetableCard.propTypes = {
  moduleName: PropTypes.string,
  moduleCode: PropTypes.string,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.string,
  lecturer: PropTypes.string,
  navigation: PropTypes.shape().isRequired,
};

TimetableCard.defaultProps = {
  moduleName: "",
  moduleCode: "ABCD123D",
  startTime: moment().toISOString(),
  endTime: moment().toISOString(),
  location: "TBC",
  lecturer: "Unknown Lecturer",
};

export default TimetableCard;
