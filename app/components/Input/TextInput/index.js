import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { textInput } from "../../../styles/Input";

const TextInputComponent = props => (
  <TextInput {...props} style={StyleSheet.flatten([textInput, props.style])} />
);
TextInputComponent.propTypes = TextInput.propTypes;
TextInputComponent.defaultProps = TextInput.defaultProps;

export default TextInputComponent;
