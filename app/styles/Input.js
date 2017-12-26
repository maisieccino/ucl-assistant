import { StyleSheet } from "react-native";
import typographyStyle from "./Typography";

export const style = StyleSheet.create({
  inputFrame: {
    padding: 10,
  },
});

export default StyleSheet.create({
  textInput: StyleSheet.flatten([typographyStyle.bodyText, style.inputFrame]),
});
