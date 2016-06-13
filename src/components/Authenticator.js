import React, { PropTypes } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

import { Styles } from '../Styles';
import { Login } from '../containers/Login';
import { Register } from '../containers/Register';
import { Button } from './Button';
import { Splash } from './Splash';

const propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
  children: PropTypes.node,
  authenticateEndpoint: PropTypes.string.isRequired,
  registerEndpoint: PropTypes.string.isRequired
};
const defaultProps = {};

export class Authenticator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: null
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('user', (err, user) => {
      this.setState({
        loading: false,
        user: user ? JSON.parse(user) : null
      });
    });
  }

  handleOnAuthenticate(user) {
    this.setState({ user });
    this.props.navigator.pop();
    AsyncStorage.setItem('user', JSON.stringify(user));
  }

  render() {
    // If we are waiting for the token from async storage show a loading screen
    if (this.state.loading) {
      return <Splash />;
    }

    // If the user is logged in pass the wrapped children back
    if (this.state.user) {
      return this.props.children;
    }

    // Otherwise show the auth component
    return (
      <View style={Styles.container}>
        <View style={Styles.logoContainer}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>LOGO</Text>
          </View>
        </View>
        <View style={Styles.formContainer}>
          <Button
            text="SIGN UP"
            onPress={() =>
              this.props.navigator.push({
                component: Register,
                props: {
                  onAuthenticate: (user) => this.handleOnAuthenticate(user),
                  apiEndpoint: this.props.registerEndpoint
                }
              })
            }
          />
          <Button
            text="LOGIN"
            onPress={() => {
              this.props.navigator.push({
                component: Login,
                props: {
                  onAuthenticate: (email, token) => this.handleOnAuthenticate(email, token),
                  apiEndpoint: this.props.authenticateEndpoint
                }
              });
            }}
          />
        </View>
      </View>
    );
  }
}

Authenticator.propTypes = propTypes;
Authenticator.defaultProps = defaultProps;
