import React, { Component } from "react";
import { ActivityIndicator, Linking } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPerson } from "../actions/peopleActions";
import Button from "../components/Button";
import { PaddedIcon, PageNoScroll, Spacer } from "../components/Containers";
import {
  BodyText,
  ErrorText,
  TitleText,
  ButtonText,
} from "../components/Typography";
import Colors from "../constants/Colors";

class PersonDetailScreen extends Component {
  static navigationOptions = {
    title: "Person Detail",
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
    fetchPerson: PropTypes.func,
    name: PropTypes.string,
    department: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    isFetching: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    token: "",
    fetchPerson: () => {},
    name: "",
    department: "",
    email: "",
    status: "",
    isFetching: false,
    error: "",
  };

  static mapStateToProps = state => ({
    name: state.people.person.name,
    department: state.people.person.department,
    email: state.people.person.email,
    status: state.people.person.status,
    token: state.user.token,
    isFetching: state.people.isFetching,
    error: state.people.searchError,
  });

  static mapDispatchToProps = dispatch => ({
    fetchPerson: (token, email) => dispatch(fetchPerson(token, email)),
  });

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = { ...params };
  }

  componentDidMount() {
    this.props.fetchPerson(this.props.token, this.state.email);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetching && !nextProps.isFetching) {
      this.setState({
        name: nextProps.name,
        email: nextProps.email,
        department: nextProps.department,
        status: nextProps.status,
      });
    }
  }
  sendEmail() {
    Linking.openURL(`mailto:${this.state.email}`);
  }

  render() {
    const { name, status, department, email } = this.state;
    const { isFetching, error } = this.props;
    return (
      <PageNoScroll>
        <TitleText>{name}</TitleText>
        {error.length > 0 && <ErrorText>Error: {error}</ErrorText>}
        <BodyText>
          {status}, {department}
        </BodyText>
        <BodyText>Email: {email}</BodyText>
        {isFetching && <ActivityIndicator size="large" />}
        <Spacer />
        <Button onPress={() => this.sendEmail()}>
          <PaddedIcon name="mail" size={24} color={Colors.pageBackground} />
          <ButtonText>Send Email...</ButtonText>
        </Button>
      </PageNoScroll>
    );
  }
}

export default connect(
  PersonDetailScreen.mapStateToProps,
  PersonDetailScreen.mapDispatchToProps,
)(PersonDetailScreen);
