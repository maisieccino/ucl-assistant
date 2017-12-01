import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  buttonWrapper: {
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: Colors.accentColor,
    padding: 8,
    borderRadius: 8,
    minWidth: 70,
    marginTop: 5,
    marginBottom: 5,
    elevation: 2,
  },
});
