import PropTypes from "prop-types";
import { View } from "react-native";

export const propTypes = {
  onPress: PropTypes.func,
  styles: View.propTypes.style,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export const defaultProps = {
  onPress: () => {},
  styles: {},
  children: "",
  disabled: false,
};
