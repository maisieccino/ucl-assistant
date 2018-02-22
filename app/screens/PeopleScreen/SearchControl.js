// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import { generate } from "shortid";
import { CentredText, BodyText } from "../../components/Typography";
import { TextInput } from "../../components/Input";
import Button from "../../components/Button";
import SearchResult from "../../components/SearchResult";
import { search, searchClear } from "../../actions/peopleActions";

class SearchControl extends Component {
  static propTypes = {
    searchResults: PropTypes.arrayOf(PropTypes.shape()),
    isSearching: PropTypes.bool,
    error: PropTypes.string,
    search: PropTypes.func,
    clear: PropTypes.func,
    token: PropTypes.string,
  };

  static defaultProps = {
    searchResults: [],
    isSearching: false,
    error: "",
    search: () => {},
    clear: () => {},
    token: "",
  };

  static mapStateToProps = state => ({
    searchResults: state.people.searchResults,
    isSearching: state.people.isSearching,
    error: state.people.searchError,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    search: (token: String, query: String) => dispatch(search(token, query)),
    clear: () => dispatch(searchClear()),
  });

  static SEARCH_DELAY = 500;

  constructor(props) {
    super(props);
    this.searchTimer = null;
  }

  state = {
    query: "",
  };

  onQueryChange(query: String) {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(
      this.search.bind(this, query),
      SearchControl.SEARCH_DELAY,
    );
    this.setState({ query });
  }

  search(query: String) {
    this.props.search(this.props.token, query);
  }

  clear() {
    this.props.clear();
    this.setState({ query: "" });
  }

  render() {
    const { error, isSearching, searchResults } = this.props;
    return (
      <View>
        {this.state.query.length > 0 && (
          <Button onPress={() => this.clear()}>Clear</Button>
        )}
        <TextInput
          placeholder="Search for a name or email..."
          onChangeText={text => this.onQueryChange(text)}
          value={this.state.query}
          clearButtonMode="always"
        />

        {error.length > 0 && <CentredText>Error! {error} </CentredText>}

        {isSearching && <ActivityIndicator />}

        {this.state.query.length === 0 && (
          <CentredText>Start typing to get search results</CentredText>
        )}

        {this.state.query.length > 0 &&
          searchResults.length === 0 && (
            <CentredText>No results found.</CentredText>
          )}

        {searchResults.map(res => (
          <SearchResult
            key={generate()}
            topText={res.name}
            bottomText={res.department}
            type="person"
            buttonText="View"
          />
        ))}
      </View>
    );
  }
}

export default connect(
  SearchControl.mapStateToProps,
  SearchControl.mapDispatchToProps,
)(SearchControl);
