import React, { PropTypes } from 'react';
import { View, ProgressBarAndroid, Text } from 'react-native';

import { Styles } from '../Styles';

const propTypes = {
  text: PropTypes.string
};
const defaultProps = {
  text: 'Loading...'
};

export const Splash = ({ text }) =>
  <View style={Styles.splash}>
    <View style={Styles.splashInner}>
      <ProgressBarAndroid />
      <Text style={Styles.splashText}>{text}</Text>
    </View>
  </View>;

Splash.propTypes = propTypes;
Splash.defaultProps = defaultProps;
