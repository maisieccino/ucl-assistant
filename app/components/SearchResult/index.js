/* eslint react-native/no-inline-styles: 0 */
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { SmallButton } from "../Button";
import { Horizontal, CircularIcon } from "../Containers";
import { SearchResultTopText, SearchResultBottomText } from "../Typography";
import Colors from "../../constants/Colors";
import Styles from "../../styles/Containers";

const getIcon = type => {
  switch (type) {
    case "location":
      return "map-pin";
    case "person":
      return "user";
    default:
      return "search";
  }
};

const SearchResult = ({
  type,
  topText,
  bottomText,
  buttonText,
  onPress,
  indicator,
  indicatorColor,
}) => (
  <Horizontal style={{ marginTop: 2, marginBottom: 2 }}>
    <CircularIcon name={getIcon(type)} size={24} />
    {indicator && (
      <View
        style={[
          Styles.circle,
          {
            backgroundColor: indicatorColor,
            position: "relative",
            left: -25,
            top: 12,
          },
        ]}
      />
    )}
    <View style={{ flex: 1 }}>
      <SearchResultTopText>{topText}</SearchResultTopText>
      <SearchResultBottomText>{bottomText}</SearchResultBottomText>
    </View>
    <SmallButton onPress={onPress}>{buttonText}</SmallButton>
  </Horizontal>
);
SearchResult.propTypes = {
  type: PropTypes.oneOf(["location", "person", ""]),
  topText: PropTypes.string,
  bottomText: PropTypes.string,
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
  indicator: PropTypes.bool,
  indicatorColor: PropTypes.string,
};
SearchResult.defaultProps = {
  type: "",
  topText: "",
  bottomText: "",
  buttonText: "Button",
  onPress: () => {},
  indicator: false,
  indicatorColor: Colors.textInputBackground,
};

export default SearchResult;
