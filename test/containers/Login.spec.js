import React from 'react';
import { TextInput } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
const fetchMock = require('fetch-mock');
import sinon from 'sinon';

import { Button } from '../../src/components/Button';
import { Login } from '../../src/containers/Login';

const noop = () => {};

describe('Login Component', () => {
  afterEach((done) => {
    fetchMock.restore();
    setTimeout(done);
  });

  it('renders the component', () => {
    const wrapper = shallow(
      <Login
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/authenticate"
      />
    );
    expect(wrapper.length).to.equal(1);
    expect(wrapper.find(TextInput)).to.have.length(2);
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('updates state on email input change', () => {
    const wrapper = shallow(
      <Login
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/authenticate"
      />
    );
    const input = wrapper.find(TextInput).at(0);
    input.simulate('changeText', '1@2.com');
    expect(wrapper.state('email')).to.equal('1@2.com');
  });

  it('updates state on password input change', () => {
    const wrapper = shallow(
      <Login
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/authenticate"
      />
    );
    const input = wrapper.find(TextInput).at(1);
    input.simulate('changeText', 'abcde');
    expect(wrapper.state('password')).to.equal('abcde');
  });

  it('sets loading state before authenticating', () => {
    fetchMock.mock('/api/accounts/authenticate', 200);
    const wrapper = shallow(
      <Login
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/authenticate"
      />
    );
    wrapper.instance().setState({
      email: 'abc@cba.com',
      password: '123456'
    });
    wrapper.find(Button).simulate('press');
    expect(wrapper.state('loading')).to.be.true();
  });

  it('sets error state on unsuccessful authentication', (done) => {
    fetchMock.mock('/api/accounts/authenticate', {
      status: 401,
      body: {
        error: 'Invalid username or password'
      }
    });
    const wrapper = shallow(
      <Login
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/authenticate"
      />
    );
    wrapper.instance().setState({
      email: 'abc@cba.com',
      password: '123456'
    });
    wrapper.instance().handleSubmit().should.be.fulfilled().then(() => {
      expect(wrapper.state('error')).to.equal('Invalid username or password');
      expect(wrapper.state('loading')).to.be.false();
    }).should.notify(done);
  });

  it('invokes onAuthenticate callback on successful authentication', (done) => {
    fetchMock.mock('/api/accounts/authenticate', {
      status: 200,
      body: {
        token: 'JWT ATOKENGOESHERE'
      }
    });
    const onAuth = sinon.spy();
    const wrapper = shallow(
      <Login
        onAuthenticate={onAuth}
        apiEndpoint="/api/accounts/authenticate"
      />
    );
    wrapper.instance().setState({
      email: 'abc@cba.com',
      password: '123456'
    });
    wrapper.instance().handleSubmit().should.be.fulfilled().then(() => {
      expect(wrapper.state('error')).to.equal(null);
      expect(wrapper.state('loading')).to.be.false();
      expect(onAuth.calledOnce).to.be.true();
    }).should.notify(done);
  });
});
