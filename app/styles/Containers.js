import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  pageScrollContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.pageBackground,
  },
  app: {
    flex: 1,
    backgroundColor: Colors.pageBackground,
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgb(255,255,255)",
  },
  page: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: Colors.pageBackground,
  },
  mainTabPage: {
    marginBottom: 60,
  },
  spacer: {
    flex: 1,
  },
  card: {
    padding: 10,
    backgroundColor: Colors.cardBackground,
    elevation: 3,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: "column",
  },
});
