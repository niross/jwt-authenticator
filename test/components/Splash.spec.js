import React from 'react';
import { ProgressBarAndroid } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Splash } from '../../src/components/Splash';

describe('Splash Component', () => {
  it('renders', () => {
    const wrapper = shallow(<Splash text="testing..." />);
    expect(wrapper.length).to.equal(1);
    expect(wrapper.contains('testing...')).to.be.true();
    expect(wrapper.contains(<ProgressBarAndroid />)).to.be.true();
  });
});
