import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

export const propTypes = {
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  style: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
};

export const defaultProps = {
  onPress: () => {},
  loading: false,
  style: {},
  wrapperStyle: {},
  children: "",
  disabled: false,
  icon: "bell",
};
