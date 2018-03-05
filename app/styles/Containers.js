import { Platform, StyleSheet } from "react-native";
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
  page: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flexGrow: 1,
    backgroundColor: Colors.pageBackground,
  },
  mainTabPage: {
    marginTop: Platform.OS === "android" ? 20 : 0,
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
    borderRadius: 10,
    flexDirection: "column",
    shadowColor: Colors.textColor,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.75,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: "stretch",
    marginTop: 50,
    backgroundColor: "rgba(0,0,0,0)",
  },
  paddedIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  circularIcon: {
    marginRight: 15,
    backgroundColor: Colors.textInputBackground,
    padding: 10,
    borderRadius: 80,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: Colors.textColor,
    borderWidth: 1,
  },
});
