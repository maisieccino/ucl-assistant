import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { VictoryStack, VictoryBar } from "victory-native";
import Styles from "../../styles/Map";
import Colors from "../../constants/Colors";

const genCurrentData = (time, occupied) =>
  Array.from(Array(24)).map((a, i) => ({
    time: i,
    occupied: i === time ? occupied : 0,
  }));

const CapacityChart = ({ data }) => {
  const current = genCurrentData(12, 450);
  return (
    <View
      style={[Styles.wideMap, { backgroundColor: Colors.textInputBackground }]}
    >
      <VictoryStack
        height={200}
        padding={0}
        domain={{ x: [0, 24], y: [0, 650] }}
        labels={() => ""}
        animate={{ duration: 200 }}
      >
        <VictoryBar
          data={current}
          style={{ data: { fill: Colors.graphCurrentBar } }}
          x="time"
          y="occupied"
          alignment="start"
          barRatio={1}
        />
        <VictoryBar
          data={data}
          style={{ data: { fill: Colors.accentColor } }}
          x="time"
          y="occupied"
          alignment="start"
          barRatio={1}
        />
      </VictoryStack>
    </View>
  );
};

CapacityChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
};

CapacityChart.defaultProps = {
  data: [],
};

export default CapacityChart;
