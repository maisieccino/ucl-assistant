import { StyleSheet } from "react-native";
import Color from "../constants/Colors";

export const style = StyleSheet.create({
  baseStyle: {
    fontFamily: "apercu",
    color: Color.textColor,
    fontSize: 16,
    marginTop: 1,
    marginBottom: 1,
  },
  title: {
    fontFamily: "apercu-bold",
    fontSize: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 30,
    marginTop: 8,
    marginBottom: 2,
  },
  cardTitle: {
    color: Color.accentColor,
    marginTop: 0,
    marginBottom: 0,
  },
  buttonText: {
    color: Color.pageBackground,
    fontSize: 20,
    textAlign: "center",
  },
  centredText: {
    textAlign: "center",
    color: Color.lightTextColor,
    marginTop: 5,
    marginBottom: 5,
  },
  infoTextContainer: {
    marginTop: 5,
  },
  errorText: {
    color: Color.errorColor,
    marginTop: -1,
    flex: 1,
    marginLeft: 5,
  },
  warningText: {
    color: Color.warningColor,
    marginTop: -1,
    flex: 1,
    marginLeft: 5,
  },
});

export default StyleSheet.create({
  titleText: StyleSheet.flatten([style.baseStyle, style.title]),
  subtitleText: StyleSheet.flatten([
    style.baseStyle,
    style.title,
    style.subtitle,
  ]),
  bodyText: StyleSheet.flatten([style.baseStyle]),
  centredText: StyleSheet.flatten([style.baseStyle, style.centredText]),
  buttonText: StyleSheet.flatten([style.baseStyle, style.buttonText]),
  cardTitle: StyleSheet.flatten([
    style.baseStyle,
    style.title,
    style.subtitle,
    style.cardTitle,
  ]),
  cardTitleRect: {
    backgroundColor: Color.accentColor,
    width: 30,
    height: 5,
    marginLeft: 2,
    marginBottom: 5,
  },
  errorText: StyleSheet.flatten([style.baseStyle, style.errorText]),
  warningText: StyleSheet.flatten([style.baseStyle, style.warningText]),
  infoTextContainer: StyleSheet.flatten([style.infoTextContainer]),
});
