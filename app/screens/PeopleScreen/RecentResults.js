// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View } from "react-native";
import { generate } from "shortid";
import { SubtitleText, BodyText } from "../../components/Typography";

class SearchControl extends Component {
  static propTypes = {
    recents: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    recents: [],
  };

  static mapStateToProps = state => ({
    recents: state.people.recents,
  });

  render() {
    const { recents } = this.props;
    return (
      <View>
        <SubtitleText>Recently Searched</SubtitleText>
        {recents.map(res => (
          <View key={generate()}>
            <BodyText>{res.name}</BodyText>
          </View>
        ))}
      </View>
    );
  }
}

export default connect(SearchControl.mapStateToProps)(SearchControl);
