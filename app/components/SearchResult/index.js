/* eslint react-native/no-inline-styles: 0 */
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { SmallButton } from "../Button";
import { Horizontal, CircularIcon } from "../Containers";
import { SearchResultTopText, SearchResultBottomText } from "../Typography";
import Colors from "../../constants/Colors";
import Indicator from "./Indicator";

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
  indicatorLoading,
}) => (
  <Horizontal style={{ marginTop: 5, marginBottom: 5 }}>
    <CircularIcon name={getIcon(type)} size={24} />
    {indicator && (
      <Indicator color={indicatorColor} loading={indicatorLoading} />
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
  indicatorLoading: PropTypes.bool,
};
SearchResult.defaultProps = {
  type: "",
  topText: "",
  bottomText: "",
  buttonText: "Button",
  onPress: () => {},
  indicator: false,
  indicatorColor: Colors.textInputBackground,
  indicatorLoading: false,
};

export default SearchResult;
