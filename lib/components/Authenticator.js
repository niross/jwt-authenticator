'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.Authenticator=undefined;var _jsxFileName='src/components/Authenticator.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');

var _Styles=require('../Styles');
var _Login=require('../containers/Login');
var _Register=require('../containers/Register');
var _rnButton=require('rn-button');
var _Splash=require('./Splash');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var propTypes={
navigator:_react.PropTypes.object,
route:_react.PropTypes.object,
children:_react.PropTypes.node,
authenticateEndpoint:_react.PropTypes.string.isRequired,
registerEndpoint:_react.PropTypes.string.isRequired,
logoText:_react.PropTypes.string.isRequired,
styles:_react.PropTypes.object};

var defaultProps={
styles:{
container:{},
logoText:{}}};var 



Authenticator=exports.Authenticator=function(_React$Component){_inherits(Authenticator,_React$Component);
function Authenticator(props){_classCallCheck(this,Authenticator);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(Authenticator).call(this,
props));

_this.state={
loading:true,
user:null};return _this;}_createClass(Authenticator,[{key:'componentWillMount',value:function componentWillMount()



{var _this2=this;
_reactNative.AsyncStorage.getItem('user',function(err,user){
_this2.setState({
loading:false,
user:user?JSON.parse(user):null});});}},{key:'handleOnAuthenticate',value:function handleOnAuthenticate(




user){
this.setState({user:user});
this.props.navigator.pop();
_reactNative.AsyncStorage.setItem('user',JSON.stringify(user));}},{key:'render',value:function render()


{var _this3=this;
// If we are waiting for the token from async storage show a loading screen
if(this.state.loading){
return _react2.default.createElement(_Splash.Splash,{__source:{fileName:_jsxFileName,lineNumber:54}});}


// If the user is logged in pass the wrapped children back
if(this.state.user){
return this.props.children;}


// Otherwise show the auth component
return (
_react2.default.createElement(_reactNative.View,{
style:[
_Styles.Styles.container,
_reactNative.StyleSheet.create(this.props.styles.container)],__source:{fileName:_jsxFileName,lineNumber:64}},


_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.logoContainer,__source:{fileName:_jsxFileName,lineNumber:70}},
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.logoWrap,__source:{fileName:_jsxFileName,lineNumber:71}},
_react2.default.createElement(_reactNative.Text,{style:[_Styles.Styles.logoText,_reactNative.StyleSheet.create(this.props.styles.logoText)],__source:{fileName:_jsxFileName,lineNumber:72}},
this.props.logoText))),



_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.formContainer,__source:{fileName:_jsxFileName,lineNumber:77}},
_react2.default.createElement(_rnButton.Button,{
text:'SIGN UP',
onPress:function onPress(){return (
_this3.props.navigator.push({
component:_Register.Register,
props:{
styles:_this3.props.styles,
logoText:_this3.props.logoText,
onAuthenticate:function onAuthenticate(user){return _this3.handleOnAuthenticate(user);},
apiEndpoint:_this3.props.registerEndpoint}}));},__source:{fileName:_jsxFileName,lineNumber:78}}),




_react2.default.createElement(_rnButton.Button,{
text:'LOGIN',
onPress:function onPress(){
_this3.props.navigator.push({
component:_Login.Login,
props:{
styles:_this3.props.styles,
logoText:_this3.props.logoText,
onAuthenticate:function onAuthenticate(email,token){return _this3.handleOnAuthenticate(email,token);},
apiEndpoint:_this3.props.authenticateEndpoint}});},__source:{fileName:_jsxFileName,lineNumber:92}}))));}}]);return Authenticator;}(_react2.default.Component);










Authenticator.propTypes=propTypes;
Authenticator.defaultProps=defaultProps;