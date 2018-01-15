import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { momentObj } from "react-moment-proptypes";
import Button from "../../../components/Button";

const DatePicker = ({ date, onChange }) => (
  <Button
  // onPress={async () => {
  //   const { action, year, month, day } = await DatePickerAndroid.open({
  //     date: date.toDate(),
  //   });
  //   if (action !== DatePickerAndroid.dismissedAction) {
  //     onChange(moment({ year, month, day }));
  //   }
  // }}
  >
    Jump To Date...
  </Button>
);

DatePicker.propTypes = {
  date: momentObj,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  date: moment().startOf("day"),
  onChange: () => {},
};

export default DatePicker;
