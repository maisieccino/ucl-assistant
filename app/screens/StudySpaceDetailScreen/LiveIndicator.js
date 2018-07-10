import React from "react";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { BodyText } from "../../components/Typography";
import Colors from "../../constants/Colors";
import Style from "../../styles/Containers";

const LiveIndicator = ({ children, active }) => (
  <LinearGradient
    colors={
      active
        ? [Colors.errorColor, Colors.indicatorOrange]
        : [Colors.textColor, Colors.lightTextColor]
    }
    start={[0, 1]}
    end={[1, 0]}
    style={Style.liveIndicator}
  >
    <BodyText style={{ color: Colors.pageBackground }}>{children}</BodyText>
  </LinearGradient>
);

LiveIndicator.propTypes = {
  children: PropTypes.string,
  active: PropTypes.bool,
};

LiveIndicator.defaultProps = {
  children: "LIVE",
  active: true,
};

export default LiveIndicator;
