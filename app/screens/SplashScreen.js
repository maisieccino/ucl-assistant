import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { signIn } from "../actions/userActions";
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
    isSigningIn: PropTypes.bool,
    error: PropTypes.string,
    scopeNumber: PropTypes.number,
    signIn: PropTypes.func,
  };

  static defaultProps = {
    isSigningIn: false,
    error: "",
    scopeNumber: -1,
    signIn: () => {},
  };

  static mapStateToProps = state => ({
    isSigningIn: state.user.isSigningIn,
    error: state.user.signInError,
    scopeNumber: state.user.scopeNumber,
  });

  static mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
  });

  componentWillReceiveProps(nextProps) {
    if (this.props.isSigningIn === true && nextProps.isSigningIn === false) {
      // did we just sign in?
      if (nextProps.scopeNumber >= 0) {
        // yes.
        this.props.navigation.navigate("Timetable");
      } else if (nextProps.error.length < 1) {
        // cancelled
      } else {
        // error
        setTimeout(() => Alert.alert("Error Signing In", nextProps.error), 500);
      }
    }
  }

  render() {
    return (
      <PageNoScroll>
        <TitleText>UCL Assistant</TitleText>
        <BodyText>One app to manage your life at UCL.</BodyText>
        <Spacer />
        <CustomButton
          onPress={() => this.props.signIn()}
          loading={this.props.isSigningIn}
        >
          Sign In With UCL
        </CustomButton>
      </PageNoScroll>
    );
  }
}

export default connect(
  SplashScreen.mapStateToProps,
  SplashScreen.mapDispatchToProps,
)(SplashScreen);
