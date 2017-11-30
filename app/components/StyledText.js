import React from "react";
import { Text } from "react-native";

export const MonoText = ({ style, ...rest }) => (
  <Text {...rest} style={[style, { fontFamily: "space-mono" }]} />
);

MonoText.propTypes = {
  style: Text.propTypes.style,
};

MonoText.defaultProps = {
  style: {},
};

export default { MonoText };
