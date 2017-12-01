import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  page: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
  card: {
    padding: 10,
    backgroundColor: Colors.cardBackground,
    elevation: 3,
    marginBottom: 10,
    marginTop: 10,
  },
});
