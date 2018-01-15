import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { Platform, StatusBar, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Feather } from "@expo/vector-icons";
import configureStore from "./configureStore";
import RootNavigation from "./navigation/RootNavigation";
import Styles from "./styles/Containers";

class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  };

  static defaultProps = {
    skipLoadingScreen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      store: configureStore(),
    };
  }

  componentWillMount() {
    StatusBar.setHidden(false);
  }

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([require("./assets/images/undraw_calendar.png")]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Feather.font,
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
    const { store, persistor } = this.state.store;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={Styles.app}>
            <StatusBar barStyle="light-content" hidden={false} />
            {Platform.OS === "android" && (
              <View style={Styles.statusBarUnderlay} />
            )}
            <RootNavigation />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
