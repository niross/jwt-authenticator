import React from 'react';
import { TextInput } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
const fetchMock = require('fetch-mock');
import sinon from 'sinon';

import { Button } from '../../src/components/Button';
import { Register } from '../../src/containers/Register';

const noop = () => {};

describe('Register Component', () => {
  afterEach((done) => {
    fetchMock.restore();
    setTimeout(done);
  });

  it('renders the component', () => {
    const wrapper = shallow(
      <Register
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/register"
      />
    );
    expect(wrapper.length).to.equal(1);
    expect(wrapper.find(TextInput)).to.have.length(3);
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('updates state on name input change', () => {
    const wrapper = shallow(
      <Register
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/register"
      />
    );
    const input = wrapper.find(TextInput).at(0);
    input.simulate('changeText', 'aname');
    expect(wrapper.state('name')).to.equal('aname');
  });

  it('updates state on email input change', () => {
    const wrapper = shallow(
      <Register
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/register"
      />
    );
    const input = wrapper.find(TextInput).at(1);
    input.simulate('changeText', '1@2.com');
    expect(wrapper.state('email')).to.equal('1@2.com');
  });

  it('updates state on password input change', () => {
    const wrapper = shallow(
      <Register
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/register"
      />
    );
    const input = wrapper.find(TextInput).at(2);
    input.simulate('changeText', 'abcde');
    expect(wrapper.state('password')).to.equal('abcde');
  });

  it('sets loading state before registering', () => {
    fetchMock.mock('/api/accounts/register', 200);
    const wrapper = shallow(
      <Register
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/register"
      />
    );
    wrapper.instance().setState({
      name: 'aname',
      email: 'abc@cba.com',
      password: '123456'
    });
    wrapper.find(Button).simulate('press');
    expect(wrapper.state('loading')).to.be.true();
  });

  it('sets error state on unsuccessful register', (done) => {
    fetchMock.mock('/api/accounts/register', {
      status: 400,
      body: {
        error: 'Email address already exists'
      }
    });
    const wrapper = shallow(
      <Register
        onAuthenticate={noop}
        apiEndpoint="/api/accounts/register"
      />
    );
    wrapper.instance().setState({
      name: 'aname',
      email: 'abc@cba.com',
      password: '123456'
    });
    wrapper.instance().handleSubmit().should.be.fulfilled().then(() => {
      expect(wrapper.state('error')).to.equal('Email address already exists');
      expect(wrapper.state('loading')).to.be.false();
    }).should.notify(done);
  });

  it('invokes onAuthenticate callback on successful registration', (done) => {
    fetchMock.mock('/api/accounts/register', {
      status: 200,
      body: {
        token: 'JWT ATOKENGOESHERE',
        name: 'aname',
        email: 'abc@abc.com',
        password: '123456'
      }
    });
    const onAuth = sinon.spy();
    const wrapper = shallow(
      <Register
        onAuthenticate={onAuth}
        apiEndpoint="/api/accounts/register"
      />
    );
    wrapper.instance().setState({
      name: 'aname',
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