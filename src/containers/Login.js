import React, { PropTypes } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from '../components/Button';

import { parseJSON } from '../utils';

const propTypes = {
  onAuthenticate: PropTypes.func.isRequired,
  apiEndpoint: PropTypes.string.isRequired
};
const defaultProps = {
  loading: false
};

import { Styles } from '../Styles';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
          this.props.onAuthenticate(this.state.email, response.token)
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: 'An error occurred while logging you in. Please try again.'
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
            text="LOGIN"
            onPress={() => this.handleSubmit()}
            disabled={!this.state.email || !this.state.password}
            loading={this.state.loading}
            loadingText="Logging you in..."
          />
        </View>
      </View>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
