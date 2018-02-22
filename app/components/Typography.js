/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
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

export const CentredText = ({ children }) => (
  <Text style={Style.centredText}>{children}</Text>
);
CentredText.propTypes = propTypes;
CentredText.defaultTextProps = defaultProps;

export const ButtonText = ({ children }) => (
  <Text style={Style.buttonText}>{children}</Text>
);
ButtonText.propTypes = propTypes;
ButtonText.defaultTextProps = defaultProps;

export const SmallButtonText = ({ children }) => (
  <Text style={Style.smallButtonText}>{children}</Text>
);
SmallButtonText.propTypes = propTypes;
SmallButtonText.defaultTextProps = defaultProps;

export const CardTitleText = ({ children }) => (
  <View>
    <Text style={Style.cardTitle}>{children}</Text>
    <View style={Style.cardTitleRect} />
  </View>
);
CardTitleText.propTypes = propTypes;
CardTitleText.defaultTextProps = defaultProps;

export const SearchResultTopText = ({ children }) => (
  <Text style={Style.searchResultTopText}>{children}</Text>
);
SearchResultTopText.propTypes = propTypes;
SearchResultTopText.defaultTextProps = defaultProps;

export const SearchResultBottomText = ({ children }) => (
  <Text style={Style.searchResultBottomText}>{children}</Text>
);
SearchResultBottomText.propTypes = propTypes;
SearchResultBottomText.defaultTextProps = defaultProps;

export default {};
