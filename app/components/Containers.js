/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";
import Styles from "../styles/Containers";

const propTypes = {
  children: PropTypes.node,
  styles: View.propTypes.style,
};
const defaultProps = {
  children: "",
  styles: {},
};

export const Page = ({ children, styles }) => (
  <ScrollView style={Styles.pageScrollContainer}>
    <View style={[styles, Styles.page]}>{children}</View>
  </ScrollView>
);
Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export const PageNoScroll = ({ children, styles }) => (
  <View style={[styles, Styles.page]}>{children}</View>
);
PageNoScroll.propTypes = propTypes;
PageNoScroll.defaultProps = defaultProps;

export const Spacer = () => <View style={Styles.spacer} />;

export default {};
