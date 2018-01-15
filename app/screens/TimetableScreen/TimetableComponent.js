import React from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import { momentObj } from "react-moment-proptypes";
import moment from "moment";
import { generate } from "shortid";
import TimetableCard from "../../components/Card/TimetableCard";
import { BodyText } from "../../components/Typography";

const TimetableComponent = ({ timetable, date, isLoading }) => {
  const dateISO = date.format("YYYY-MM-DD");
  const filteredTimetable = timetable[dateISO] || [];

  if (isLoading && filteredTimetable.length === 0) {
    return (
      <View>
        <BodyText>Loading timetable</BodyText>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const items = filteredTimetable
    .sort(
      (a, b) =>
        Date.parse(`${dateISO}T${a.start_time}:00`) -
        Date.parse(`${dateISO}T${b.start_time}:00`),
    )
    .map(item => (
      <TimetableCard
        moduleName={item.module.name}
        moduleCode={item.module.module_id}
        startTime={`${dateISO} ${item.start_time}`}
        endTime={`${dateISO} ${item.end_time}`}
        location={item.location.name || "TBA"}
        lecturer={
          item.module.lecturer ? item.module.lecturer.name : "Unknown Lecturer"
        }
        key={generate()}
      />
    ));
  if (filteredTimetable.length > 0) {
    return (
      <View>
        {items}
        {isLoading && <ActivityIndicator size="large" />}
      </View>
    );
  }
  return <BodyText>Nothing scheduled on this day.</BodyText>;
};

TimetableComponent.propTypes = {
  timetable: PropTypes.shape(),
  date: momentObj,
  isLoading: PropTypes.bool,
};

TimetableComponent.defaultProps = {
  timetable: {},
  date: moment(),
  isLoading: false,
};

export default TimetableComponent;
