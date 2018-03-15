import React from "react";
import { LinearGradient } from "expo";
import { BodyText } from "../../components/Typography";
import Colors from "../../constants/Colors";
import Style from "../../styles/Containers";

export default () => (
  <LinearGradient
    colors={[Colors.errorColor, Colors.indicatorOrange]}
    start={[0, 1]}
    end={[1, 0]}
    style={Style.liveIndicator}
  >
    <BodyText style={{ color: Colors.pageBackground }}>LIVE</BodyText>
  </LinearGradient>
);
