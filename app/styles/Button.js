import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
  },
  button: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    minWidth: 70,
    marginTop: 5,
    marginBottom: 5,
    elevation: 2,
  },
  disabled: {
    backgroundColor: Colors.disabledButtonBackground,
  },
});
