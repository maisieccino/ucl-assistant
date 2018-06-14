/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { Platform, ToastAndroid, View } from "react-native"; // eslint-disable-line react-native/split-platform-components
import { NavigationActions, StackActions } from "react-navigation";
import PropTypes from "prop-types";
import { Constants } from "expo";
import { connect } from "react-redux";
import {
  TitleText,
  BodyText,
  SubtitleText,
  ButtonText,
} from "../components/Typography";
import { MainTabPage, Horizontal, PaddedIcon } from "../components/Containers";
import { signOut } from "../actions/userActions";
import Button from "../components/Button";
import Colors from "../constants/Colors";

const { version } = require("../package.json");

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    signOut: PropTypes.func,
    navigation: PropTypes.shape(),
    state: PropTypes.shape(),
  };

  static defaultProps = {
    signOut: () => {},
    navigation: {},
    state: {},
  };

  static mapStateToProps = state => ({
    state,
  });

  static mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
  });

  state = {
    isSigningOut: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.isSigningOut && this.props.state.user.token === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "You have successfully signed out",
          ToastAndroid.SHORT,
        );
      }
      const action = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Splash" })],
      });
      this.props.navigation.dispatch(action);
    }
  }

  signOut() {
    this.props.signOut();
    this.setState({ isSigningOut: true });
  }

  render() {
    const { state } = this.props;
    return (
      <MainTabPage>
        <TitleText>Settings</TitleText>
        <Button onPress={() => this.signOut()}>
          <Horizontal>
            <PaddedIcon
              name="log-out"
              size={24}
              color={Colors.pageBackground}
            />
            <ButtonText>Sign Out</ButtonText>
          </Horizontal>
        </Button>
        <TitleText>About</TitleText>
        <SubtitleText>Version</SubtitleText>
        <BodyText>{version}</BodyText>
        <BodyText>
          Release channel:{" "}
          {__DEV__ ? "Developer Mode" : Constants.manifest.releaseChannel}
        </BodyText>
        <SubtitleText>Author</SubtitleText>
        <BodyText>Created by Matt Bell, using the UCL API.</BodyText>
        <BodyText>
          Illustrations courtesy of the unDraw project, released under the MIT
          license.
        </BodyText>
        {__DEV__ && (
          <View>
            <TitleText>Dev Stuff</TitleText>
            <SubtitleText>State</SubtitleText>
            <BodyText>{JSON.stringify(state, "\n", 2)}</BodyText>
          </View>
        )}
      </MainTabPage>
    );
  }
}

export default connect(
  TimetableScreen.mapStateToProps,
  TimetableScreen.mapDispatchToProps,
)(TimetableScreen);
