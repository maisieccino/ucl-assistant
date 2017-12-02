import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  pageScrollContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.pageBackground,
  },
  page: {
    padding: 20,
    flexGrow: 1,
  },
  spacer: {
    flex: 1,
  },
  app: {
    backgroundColor: Colors.pageBackground,
  },
  card: {
    padding: 10,
    backgroundColor: Colors.cardBackground,
    elevation: 3,
    marginBottom: 5,
    marginTop: 5,
  },
});
