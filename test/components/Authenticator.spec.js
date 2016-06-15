import React from 'react';
import { Text, AsyncStorage } from 'react-native';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { Authenticator } from '../../src/components/Authenticator';
import { Splash } from '../../src/components/Splash';

describe('Authenticator Component', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  it('renders the splash page on initial load', () => {
    const wrapper = shallow(
      <Authenticator
        navigator={{}}
        route={{}}
        authenticateEndpoint=""
        registerEndpoint=""
        logoText="The Logo"
      >
        <Text>children</Text>
      </Authenticator>
    );
    expect(wrapper.find(Splash)).to.have.length(1);
  });

  it('renders the authenticator if the user is not authenticated', () => {
    const wrapper = mount(
      <Authenticator
        navigator={{}}
        route={{}}
        authenticateEndpoint=""
        registerEndpoint=""
        logoText="The Logo"
      >
        <Text>children</Text>
      </Authenticator>
    );
    wrapper.instance().setState({ loading: false });
    expect(wrapper.length).to.equal(1);
    expect(wrapper.contains(<Text>children</Text>)).to.be.false();
  });

  /**
   * FIXME
   * I haven't been able to find a nice way to wait for a promise within
   * componentWillMount so for now set the state manually.
   */
  it('shows the children if the user is authenticated', (done) => {
    const child = <Text>child</Text>;
    Authenticator.prototype.componentWillMount = function() {
      this.setState({ loading: false, user: { token: 'xxxxxx' } });
    };
    const wrapper = mount(
      <Authenticator
        navigator={{}}
        route={{}}
        authenticateEndpoint=""
        registerEndpoint=""
        logoText="The Logo"
      >
        {child}
      </Authenticator>
    );
    expect(wrapper).to.exist();
    expect(wrapper.contains(child)).to.be.true();
    done();
  });

  it('invokes the onAuthenticate callback on successful authentication', (done) => {
    const onAuth = sinon.spy();
    const wrapper = shallow(
      <Authenticator
        navigator={{ pop: () => {} }}
        route={{}}
        authenticateEndpoint=""
        registerEndpoint=""
        logoText="The Logo"
        onAuthenticate={onAuth}
      >
        <Text>Test</Text>
      </Authenticator>
    );
    wrapper.instance().handleOnAuthenticate({ name: 'Test User' });
    expect(onAuth.calledOnce).to.be.true();
    done();
  });
});