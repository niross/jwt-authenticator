'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.Splash=undefined;var _jsxFileName='src/components/Splash.js';var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');

var _Styles=require('../Styles');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var propTypes={
text:_react.PropTypes.string};

var defaultProps={
text:'Loading...'};


var Splash=exports.Splash=function Splash(_ref){var text=_ref.text;return (
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.splash,__source:{fileName:_jsxFileName,lineNumber:14}},
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.splashInner,__source:{fileName:_jsxFileName,lineNumber:15}},
_react2.default.createElement(_reactNative.ProgressBarAndroid,{__source:{fileName:_jsxFileName,lineNumber:16}}),
_react2.default.createElement(_reactNative.Text,{style:_Styles.Styles.splashText,__source:{fileName:_jsxFileName,lineNumber:17}},text))));};



Splash.propTypes=propTypes;
Splash.defaultProps=defaultProps;