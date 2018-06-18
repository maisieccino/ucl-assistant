/* eslint react/require-default-props: 0 */
import React, { Fragment } from "react";
import { BlurView } from "expo";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import {
  Dimensions,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  ViewPropTypes,
} from "react-native";
import Styles from "../styles/Containers";

const { height, width } = Dimensions.get("window");

const propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
  refreshEnabled: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  mainTabPage: PropTypes.bool,
};
const defaultProps = {
  children: "",
  style: {},
  refreshEnabled: false,
  onRefresh: () => {},
  refreshing: false,
  mainTabPage: false,
};

// export const Page = ({ children, style, ...props }) => (
//   // <ScrollView style={Styles.pageScrollContainer}>
//   //   <View style={[style, Styles.page]}>{children}</View>
//   // </ScrollView>
//   <KeyboardAvoidingView
//     style={[Styles.pageScrollContainer]}
//     {...props}
//     behavior="padding"
//   >
//     <ScrollView style={[style, Styles.page, Styles.scrollPage]}>
//       {children}
//     </ScrollView>
//   </KeyboardAvoidingView>
// );
// Page.propTypes = propTypes;
// Page.defaultProps = defaultProps;

export const Page = ({
  children,
  style,
  refreshEnabled,
  onRefresh,
  refreshing,
  mainTabPage,
  ...props
}) => (
  <Fragment>
    <KeyboardAvoidingView
      style={[Styles.pageContainer, mainTabPage ? Styles.mainTab : null]}
      {...props}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={Styles.pageScrollContent}
        style={[style, Styles.page, Styles.pageScrollView]}
        refreshControl={
          <RefreshControl
            enabled={refreshEnabled}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
      >
        <View style={{ height: 10 }} />
        {children}
      </ScrollView>
      {mainTabPage && (
        <BlurView
          tint="light"
          intensity={85}
          style={[StyleSheet.absoluteFill, Styles.mainTabBlur]}
        />
      )}
    </KeyboardAvoidingView>
  </Fragment>
);
Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export const PageNoScroll = ({ children, style, ...props }) => (
  <KeyboardAvoidingView
    style={[Styles.pageContainer, Styles.pageNoScrollContainer]}
    {...props}
    behavior="padding"
  >
    <View style={[Styles.page, style]}>{children}</View>
  </KeyboardAvoidingView>
);
PageNoScroll.propTypes = propTypes;
PageNoScroll.defaultProps = defaultProps;

export const Spacer = () => <View style={Styles.spacer} />;

export const Horizontal = ({ children, style }) => (
  <View style={[Styles.horizontal, style]}>{children}</View>
);
Horizontal.propTypes = propTypes;
Horizontal.defaultProps = defaultProps;

export const PaddedIcon = props => (
  <Feather {...props} style={Styles.paddedIcon} />
);
PaddedIcon.propTypes = Feather.propTypes;
PaddedIcon.defaultProps = Feather.defaultProps;

export const CircularIcon = props => (
  <Feather {...props} style={Styles.circularIcon} />
);
CircularIcon.propTypes = Feather.propTypes;
CircularIcon.defaultProps = Feather.defaultProps;

export default {};
