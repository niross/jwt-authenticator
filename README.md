### jwt-authenticator

**WIP**

Protect your app with jwt authentication by wrapping it in an `<Authenticator>` component.

### Usage
Install the button from github ` npm install niross/jwt-authenticator --save`.
Require it in your app `import { Authenticator } from jwt-authenticator`.
Wrap your react app in the `<Authenticator>` component.

```js
import React, { Component } from 'react';
import { Authenticator } from 'jwt-authenticator';

export default class MyComponent extends Component {
  render() {
    return (
      <Authenticator
        navigator={this.props.navigator}
        route={this.props.route}
        authenticateEndpoint={`${host}/api/accounts/authenticate`}
        registerEndpoint={`${host}/api/accounts/register`}
        logoText="Gratus"
      >
        <Text>
          This will be displayed once the user has authenticated
        </Text>
      </Authenticator>
    );
  }
};
```