/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Styles from "../styles/Containers";

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: "",
};

export const Page = ({ children }) => (
  <View style={Styles.page}>{children}</View>
);
Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default {};
