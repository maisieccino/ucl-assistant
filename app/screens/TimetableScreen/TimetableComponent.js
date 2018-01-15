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

  if (isLoading) {
    return (
      <View>
        <BodyText>Loading timetable</BodyText>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const items = filteredTimetable
    .sort((a, b) => Date.parse(b.start_time) - Date.parse(a.start_time))
    .map(item => (
      <TimetableCard
        moduleName={item.module.name}
        moduleCode={item.module.module_id}
        startTime={`${dateISO} ${item.start_time}`}
        endTime={`${dateISO} ${item.end_time}`}
        location={item.location.name || "TBA"}
        lecturer={item.lecturer ? item.lecturer.name : "Unknown Lecturer"}
        key={generate()}
      />
    ));
  if (filteredTimetable.length > 0) {
    return items;
  }
  return <BodyText>Nothing scheduled on this day.</BodyText>;
};

TimetableComponent.propTypes = {
  timetable: PropTypes.shape(),
  date: momentObj,
};

TimetableComponent.defaultProps = {
  timetable: {},
  date: moment(),
};

export default TimetableComponent;
