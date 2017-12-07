import React, { Component } from "react";
import { Alert, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { AuthSession, Constants, SecureStore } from "expo";
import { TitleText, BodyText } from "../components/Typography";
import { PageNoScroll, Spacer } from "../components/Containers";
import CustomButton from "../components/Button";
import Colors from "../constants/Colors";

class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  onSignInPress = async () => {
    const result = await AuthSession.startAsync({
      authUrl: "https://ucl-assistant-server.now.sh/connect/uclapi",
      returnUrl: Constants.linkingUrl,
    });
    if (result.type === "success") {
      // set-cookies is given in the form of `key=value[;key2=value[...]]`
      // convert this to an object.
      const cookies = result.params["set-cookie"]
        .split(/\s*;\s*/)
        .map(cookie => cookie.split(/\s*=\s*/));
      const sessCookie = cookies.filter(
        cookie => cookie[0] === "koa:sess",
      )[0][1];
      const sigCookie = cookies.filter(
        cookie => cookie[0] === "koa:sess.sig",
      )[0][1];
      try {
        await SecureStore.setItemAsync("cookie-sess", sessCookie);
        await SecureStore.setItemAsync("cookie-sess-sig", sigCookie);
        const user = { ...result.params };
        delete user[cookies];
        await AsyncStorage.setItem("@UCLAssistant:user", JSON.stringify(user));
        this.props.navigation.navigate("Timetable");
      } catch (err) {
        Alert.alert("Error saving user info", err.message);
      }
    }
  };

  render() {
    return (
      <PageNoScroll>
        <TitleText>UCL Assistant</TitleText>
        <BodyText>One app to manage your life at UCL.</BodyText>
        <Spacer />
        <CustomButton onPress={() => this.onSignInPress()}>
          Sign In With UCL
        </CustomButton>
      </PageNoScroll>
    );
  }
}

export default SplashScreen;
