import React, { Component } from "react";
import { Platform, ToastAndroid } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TitleText } from "../components/Typography";
import { MainTabPage } from "../components/Containers";
import { signOut } from "../actions/userActions";
import Button from "../components/Button";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    signOut: PropTypes.func,
    navigation: PropTypes.shape(),
  };

  static defaultProps = {
    signOut: () => {},
    navigation: {},
  };

  static mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
  });

  signOut() {
    this.props.signOut();
    if (Platform.OS === "android") {
      ToastAndroid.show("You have successfully signed out", ToastAndroid.SHORT);
    }
    this.props.navigation.navigate("Splash");
  }

  render() {
    return (
      <MainTabPage>
        <TitleText>Settings</TitleText>
        <Button onPress={() => this.signOut()}>Sign Out</Button>
      </MainTabPage>
    );
  }
}

export default connect(() => ({}), TimetableScreen.mapDispatchToProps)(
  TimetableScreen,
);
