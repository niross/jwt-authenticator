import React, { PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';

import { parseJSON } from '../utils';
import { Button } from '../components/Button';

const propTypes = {
  onAuthenticate: PropTypes.func.isRequired,
  apiEndpoint: PropTypes.string.isRequired
};
const defaultProps = {
  loading: false
};

import { Styles } from '../Styles';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      error: null,
      loading: false
    };
  }

  handleFieldChange(fieldName, fieldValue) {
    this.setState({ [fieldName]: fieldValue });
  }

  handleSubmit() {
    this.setState({
      loading: true,
      error: null
    });
    return fetch(this.props.apiEndpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(parseJSON)
      .then((response) => {
        if (response.error) {
          this.setState({
            loading: false,
            error: response.error
          });
        }
        else {
          this.setState({ loading: false });
          this.props.onAuthenticate(response);
          // this.props.navigator.pop();
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: 'An error occurred while creating your account. Please try again.'
        });
      });
  }

  render() {
    return (
      <View style={Styles.loginContainer}>
        <View style={Styles.loginLogoContainer}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>LOGO</Text>
          </View>
        </View>
        <View style={Styles.formErrorContainer}>
          <Text style={Styles.formError}>
            {this.state.error ? this.state.error : null}</Text>
        </View>
        <View style={Styles.loginFormContainer}>
          <TextInput
            onChangeText={(text) => this.handleFieldChange('name', text)}
            value={this.state.name}
            placeholder="Enter your name"
          />
          <TextInput
            keyboardType="email-address"
            onChangeText={(text) => this.handleFieldChange('email', text)}
            value={this.state.email}
            placeholder="Enter your email address"
          />
          <TextInput
            secureTextEntry
            onChangeText={(text) => this.handleFieldChange('password', text)}
            value={this.state.password}
            placeholder="Enter your password"
          />
          <Button
            text="REGISTER"
            onPress={() => this.handleSubmit()}
            disabled={!this.state.name || !this.state.email || !this.state.password}
            loading={this.state.loading}
            loadingText="Creating your account..."
          />
        </View>
      </View>
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
