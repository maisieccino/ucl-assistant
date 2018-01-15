import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { momentObj } from "react-moment-proptypes";
import { Horizontal, Spacer } from "../../../components/Containers";
import Button, { RoundButton } from "../../../components/Button";
import DatePicker from "./DatePicker";

class DateControls extends Component {
  static propTypes = {
    onDateChanged: PropTypes.func,
    date: momentObj,
  };

  static defaultProps = {
    onDateChanged: () => {},
    date: moment().startOf("day"),
  };

  render() {
    const { onDateChanged, date } = this.props;
    return (
      <Horizontal>
        <RoundButton
          onPress={() => onDateChanged(date.subtract(1, "day"))}
          icon="chevron-left"
        />
        <Spacer />
        <DatePicker date={date} onChange={d => onDateChanged(d)} />
        <Spacer />
        <RoundButton
          onPress={() => onDateChanged(date.add(1, "day"))}
          icon="chevron-right"
        />
      </Horizontal>
    );
  }
}

export default DateControls;
