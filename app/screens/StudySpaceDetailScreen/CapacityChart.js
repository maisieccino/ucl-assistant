import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { VictoryStack, VictoryArea } from "victory-native";
import Styles from "../../styles/Map";
import Colors from "../../constants/Colors";

const CapacityChart = ({ data }) => (
  <View
    style={[Styles.wideMap, { backgroundColor: Colors.textInputBackground }]}
  >
    <VictoryStack
      height={200}
      padding={0}
      animate={{ duration: 20, easing: "cubic" }}
    >
      <VictoryArea
        domain={{ x: [0, 24], y: [0, 650] }}
        data={data}
        x="time"
        y="occupied"
      />
    </VictoryStack>
  </View>
);

CapacityChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
};

CapacityChart.defaultProps = {
  data: [],
};

export default CapacityChart;
