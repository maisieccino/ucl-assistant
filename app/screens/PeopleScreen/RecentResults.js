// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View } from "react-native";
import { generate } from "shortid";
import { SubtitleText } from "../../components/Typography";
import SearchResult from "../../components/SearchResult";

class RecentResults extends Component {
  static propTypes = {
    recents: PropTypes.arrayOf(PropTypes.shape()),
    navigation: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    recents: [],
  };

  static mapStateToProps = state => ({
    recents: state.people.recents,
  });

  render() {
    const { navigation, recents } = this.props;
    return (
      <View>
        <SubtitleText>Recently Searched</SubtitleText>
        {recents.map(res => (
          <SearchResult
            key={generate()}
            topText={res.name}
            bottomText={res.department}
            type="person"
            buttonText="View"
            onPress={() => {
              navigation.navigate("PersonDetail", res);
            }}
          />
        ))}
      </View>
    );
  }
}

export default connect(RecentResults.mapStateToProps)(RecentResults);
