/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View, ViewPropTypes } from "react-native";
import Styles from "../styles/Containers";

const propTypes = {
  children: PropTypes.node,
  styles: ViewPropTypes.style,
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

export const MainTabPage = ({ children, styles, ...props }) => (
  <ScrollView style={Styles.pageScrollContainer} {...props}>
    <View style={[styles, Styles.page, Styles.mainTabPage]}>{children}</View>
  </ScrollView>
);
MainTabPage.propTypes = propTypes;
MainTabPage.defaultProps = defaultProps;

export const PageNoScroll = ({ children, styles }) => (
  <View style={[styles, Styles.page]}>{children}</View>
);
PageNoScroll.propTypes = propTypes;
PageNoScroll.defaultProps = defaultProps;

export const Spacer = () => <View style={Styles.spacer} />;

export const Horizontal = ({ children }) => (
  <View style={Styles.horizontal}>{children}</View>
);
Horizontal.propTypes = propTypes;
Horizontal.defaultProps = defaultProps;

export default {};
