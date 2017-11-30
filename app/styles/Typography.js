import { StyleSheet } from "react-native";
import Color from "../constants/Colors";

const style = StyleSheet.create({
  baseStyle: {
    fontFamily: "apercu",
    color: Color.textColor,
    fontSize: 18,
    marginTop: 2,
    marginBottom: 2,
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
});

export default StyleSheet.create({
  titleText: StyleSheet.flatten([style.baseStyle, style.title]),
  subtitleText: StyleSheet.flatten([
    style.baseStyle,
    style.title,
    style.subtitle,
  ]),
  bodyText: StyleSheet.flatten([style.baseStyle]),
});
