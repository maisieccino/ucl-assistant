/* eslint react/require-default-props: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Horizontal } from "../Containers";
import Style from "../../styles/Typography";
import Colors from "../../constants/Colors";

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
TitleText.defaultProps = defaultProps;

export const SubtitleText = ({ children }) => (
  <Text style={Style.subtitleText}>{children}</Text>
);
SubtitleText.propTypes = propTypes;
SubtitleText.defaultProps = defaultProps;

export const BodyText = ({ children }) => (
  <Text style={Style.bodyText}>{children}</Text>
);
BodyText.propTypes = propTypes;
BodyText.defaultProps = defaultProps;

export const CentredText = ({ children }) => (
  <Text style={Style.centredText}>{children}</Text>
);
CentredText.propTypes = propTypes;
CentredText.defaultProps = defaultProps;

export const ButtonText = ({ children }) => (
  <Text style={Style.buttonText}>{children}</Text>
);
ButtonText.propTypes = propTypes;
ButtonText.defaultProps = defaultProps;

export const CardTitleText = ({ children }) => (
  <View>
    <Text style={Style.cardTitle}>{children}</Text>
    <View style={Style.cardTitleRect} />
  </View>
);
CardTitleText.propTypes = propTypes;
CardTitleText.defaultProps = defaultProps;

export const ErrorText = ({ children }) => (
  <Horizontal style={Style.infoTextContainer}>
    <Feather size={18} color={Colors.errorColor} name="alert-circle" />
    <Text style={Style.errorText}>{children}</Text>
  </Horizontal>
);
ErrorText.propTypes = propTypes;
ErrorText.defaultProps = defaultProps;

export const WarningText = ({ children, icon }) => (
  <Horizontal style={Style.infoTextContainer}>
    <Feather size={18} color={Colors.warningColor} name={icon} />
    <Text style={Style.warningText}>{children}</Text>
  </Horizontal>
);
WarningText.propTypes = { ...propTypes, icon: PropTypes.string };
WarningText.defaultProps = { ...defaultProps, icon: "info" };

export default {};
