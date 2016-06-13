'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.Register=undefined;var _jsxFileName='src/containers/Register.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _rnButton=require('rn-button');

var _Styles=require('../Styles');
var _utils=require('../utils');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var propTypes={
logoText:_react.PropTypes.string.isRequired,
onAuthenticate:_react.PropTypes.func.isRequired,
apiEndpoint:_react.PropTypes.string.isRequired,
styles:_react.PropTypes.object};

var defaultProps={
loading:false,
styles:{
container:{},
logoText:{}}};var 



Register=exports.Register=function(_React$Component){_inherits(Register,_React$Component);
function Register(props){_classCallCheck(this,Register);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(Register).call(this,
props));
_this.state={
name:null,
email:null,
password:null,
error:null,
loading:false};return _this;}_createClass(Register,[{key:'handleFieldChange',value:function handleFieldChange(



fieldName,fieldValue){
this.setState(_defineProperty({},fieldName,fieldValue));}},{key:'handleSubmit',value:function handleSubmit()


{var _this2=this;
this.setState({
loading:true,
error:null});

return fetch(this.props.apiEndpoint,{
method:'POST',
headers:{
Accept:'application/json',
'Content-Type':'application/json'},

body:JSON.stringify({
name:this.state.name,
email:this.state.email,
password:this.state.password})}).


then(_utils.parseJSON).
then(function(response){
if(response.error){
_this2.setState({
loading:false,
error:response.error});}else 


{
_this2.setState({loading:false});
_this2.props.onAuthenticate(response);}}).


catch(function(){
_this2.setState({
loading:false,
error:'An error occurred while creating your account. Please try again.'});});}},{key:'render',value:function render()




{var _this3=this;
return (
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.loginContainer,__source:{fileName:_jsxFileName,lineNumber:78}},
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.logoContainer,__source:{fileName:_jsxFileName,lineNumber:79}},
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.logoWrap,__source:{fileName:_jsxFileName,lineNumber:80}},
_react2.default.createElement(_reactNative.Text,{style:[_Styles.Styles.logoText,_reactNative.StyleSheet.create(this.props.styles.logoText)],__source:{fileName:_jsxFileName,lineNumber:81}},
this.props.logoText))),



_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.formErrorContainer,__source:{fileName:_jsxFileName,lineNumber:86}},
_react2.default.createElement(_reactNative.Text,{style:_Styles.Styles.formError,__source:{fileName:_jsxFileName,lineNumber:87}},
this.state.error?this.state.error:null)),

_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.loginFormContainer,__source:{fileName:_jsxFileName,lineNumber:90}},
_react2.default.createElement(_reactNative.TextInput,{
onChangeText:function onChangeText(text){return _this3.handleFieldChange('name',text);},
value:this.state.name,
placeholder:'Enter your name',__source:{fileName:_jsxFileName,lineNumber:91}}),

_react2.default.createElement(_reactNative.TextInput,{
keyboardType:'email-address',
onChangeText:function onChangeText(text){return _this3.handleFieldChange('email',text);},
value:this.state.email,
placeholder:'Enter your email address',__source:{fileName:_jsxFileName,lineNumber:96}}),

_react2.default.createElement(_reactNative.TextInput,{
secureTextEntry:true,
onChangeText:function onChangeText(text){return _this3.handleFieldChange('password',text);},
value:this.state.password,
placeholder:'Enter your password',__source:{fileName:_jsxFileName,lineNumber:102}}),

_react2.default.createElement(_rnButton.Button,{
text:'REGISTER',
onPress:function onPress(){return _this3.handleSubmit();},
disabled:!this.state.name||!this.state.email||!this.state.password,
loading:this.state.loading,
loadingText:'Creating your account...',__source:{fileName:_jsxFileName,lineNumber:108}}))));}}]);return Register;}(_react2.default.Component);







Register.propTypes=propTypes;
Register.defaultProps=defaultProps;