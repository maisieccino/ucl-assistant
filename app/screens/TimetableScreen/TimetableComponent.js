import React from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";
import { momentObj } from "react-moment-proptypes";
import moment from "moment";
import { generate } from "shortid";
import TimetableCard from "../../components/Card/TimetableCard";
import { CentredText } from "../../components/Typography";
import Styles from "../../styles/Containers";
import { Spacer } from "../../components/Containers";

const TimetableComponent = ({ timetable, date, isLoading, navigation }) => {
  const dateISO = date.format("YYYY-MM-DD");
  const filteredTimetable = (timetable[dateISO] || {}).timetable || [];

  if (isLoading && filteredTimetable.length === 0) {
    return (
      <View>
        <CentredText>Loading timetable...</CentredText>
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
        lecturer={item.contact ? item.contact : "Unknown Lecturer"}
        key={generate()}
        navigation={navigation}
      />
    ));
  if (filteredTimetable.length > 0) {
    return <View>{items}</View>;
  }
  return (
    <View>
      <View style={{ height: 50 }} />
      <CentredText>
        Nothing scheduled on {date.format("dddd")}. Take it easy!
      </CentredText>
      <Image
        source={require("../../assets/images/undraw_relaxation.png")}
        resizeMethod="scale"
        style={[Styles.image, { marginTop: 5, height: 200 }]}
        resizeMode="contain"
      />
    </View>
  );
};

TimetableComponent.propTypes = {
  timetable: PropTypes.shape(),
  date: momentObj,
  isLoading: PropTypes.bool,
  navigation: PropTypes.shape().isRequired,
};

TimetableComponent.defaultProps = {
  timetable: {},
  date: moment(),
  isLoading: false,
};

export default TimetableComponent;
