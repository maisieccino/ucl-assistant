/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Style from "../styles/Typography";

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: "",
};

export const TitleText = ({ children }) => (
  <Text style={Style.titleText}>{children}</Text>
);
TitleText.propTypes = propTypes;
TitleText.defaultTextProps = defaultProps;

export const SubtitleText = ({ children }) => (
  <Text style={Style.subtitleText}>{children}</Text>
);
SubtitleText.propTypes = propTypes;
SubtitleText.defaultTextProps = defaultProps;

export const BodyText = ({ children }) => (
  <Text style={Style.bodyText}>{children}</Text>
);
BodyText.propTypes = propTypes;
BodyText.defaultTextProps = defaultProps;

export default {};
