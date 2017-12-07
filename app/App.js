import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, StatusBar, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import RootNavigation from "./navigation/RootNavigation";
import Styles from "./styles/Containers";
import StorybookUI from "./storybook";

class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  };

  static defaultProps = {
    skipLoadingScreen: false,
  };

  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        apercu: require("./assets/fonts/Apercu.otf"),
        "apercu-bold": require("./assets/fonts/Apercu-Bold.otf"),
        "apercu-light": require("./assets/fonts/Apercu-Light.otf"),
      }),
    ]);

  handleLoadingError = error => {
    // TODO: Setup remote error logging
    console.warn(error); // eslint-disable-line no-console
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    if (__DEV__) {
      return <StorybookUI />;
    }
    return (
      <View style={Styles.app}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={Styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    );
  }
}

export default App;
