/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  ViewPropTypes,
} from "react-native";
import Styles from "../styles/Containers";

const propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};
const defaultProps = {
  children: "",
  style: {},
};

export const Page = ({ children, style }) => (
  <ScrollView style={Styles.pageScrollContainer}>
    <View style={[style, Styles.page]}>{children}</View>
  </ScrollView>
);
Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export const MainTabPage = ({ children, style, ...props }) => (
  <ScrollView style={Styles.pageScrollContainer} {...props}>
    <KeyboardAvoidingView
      keyboardVerticalOffset={20}
      behavior="position"
      style={[style, Styles.page, Styles.mainTabPage]}
    >
      {children}
    </KeyboardAvoidingView>
  </ScrollView>
);
MainTabPage.propTypes = propTypes;
MainTabPage.defaultProps = defaultProps;

export const PageNoScroll = ({ children, style }) => (
  <View style={[Styles.page, style]}>{children}</View>
);
PageNoScroll.propTypes = propTypes;
PageNoScroll.defaultProps = defaultProps;

export const Spacer = () => <View style={Styles.spacer} />;

export const Horizontal = ({ children, style }) => (
  <View style={[Styles.horizontal, style]}>{children}</View>
);
Horizontal.propTypes = propTypes;
Horizontal.defaultProps = defaultProps;

export const PaddedIcon = props => (
  <Feather {...props} style={Styles.paddedIcon} />
);
PaddedIcon.propTypes = Feather.propTypes;
PaddedIcon.defaultProps = Feather.defaultProps;

export const CircularIcon = props => (
  <Feather {...props} style={Styles.circularIcon} />
);
CircularIcon.propTypes = Feather.propTypes;
CircularIcon.defaultProps = Feather.defaultProps;

export default {};
