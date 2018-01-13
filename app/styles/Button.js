import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const buttonStyle = {
  padding: 8,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 8,
  minWidth: 150,
  minHeight: 55,
  elevation: 2,
  justifyContent: "center",
};

export default StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
  },
  roundButtonWrapper: {
    borderRadius: 100,
    width: 55,
    height: 55,
    marginTop: 5,
    marginBottom: 5,
    overflow: "hidden",
  },
  button: StyleSheet.flatten([
    buttonStyle,
    {
      marginTop: 5,
      marginBottom: 5,
    },
  ]),
  roundButton: StyleSheet.flatten([
    buttonStyle,
    {
      minWidth: 55,
      borderRadius: 30,
      alignItems: "center",
    },
  ]),
  disabled: {
    backgroundColor: Colors.disabledButtonBackground,
  },
});
