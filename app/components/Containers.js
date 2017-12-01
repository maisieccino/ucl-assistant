/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";
import Styles from "../styles/Containers";

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: "",
};

export const Page = ({ children }) => (
  <ScrollView>
    <View style={Styles.page}>{children}</View>
  </ScrollView>
);
Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default {};
