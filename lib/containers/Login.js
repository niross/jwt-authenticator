'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.Login=undefined;var _jsxFileName='src/containers/Login.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
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



Login=exports.Login=function(_React$Component){_inherits(Login,_React$Component);
function Login(props){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(Login).call(this,
props));
_this.state={
email:null,
password:null,
error:null,
loading:false};return _this;}_createClass(Login,[{key:'handleFieldChange',value:function handleFieldChange(



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
_this2.props.onAuthenticate(_this2.state.email,response.token);}}).


catch(function(){
_this2.setState({
loading:false,
error:'An error occurred while logging you in. Please try again.'});});}},{key:'render',value:function render()




{var _this3=this;
return (
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.loginContainer,__source:{fileName:_jsxFileName,lineNumber:76}},
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.logoContainer,__source:{fileName:_jsxFileName,lineNumber:77}},
_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.logoWrap,__source:{fileName:_jsxFileName,lineNumber:78}},
_react2.default.createElement(_reactNative.Text,{style:[_Styles.Styles.logoText,_reactNative.StyleSheet.create(this.props.styles.logoText)],__source:{fileName:_jsxFileName,lineNumber:79}},
this.props.logoText))),



_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.formErrorContainer,__source:{fileName:_jsxFileName,lineNumber:84}},
_react2.default.createElement(_reactNative.Text,{style:_Styles.Styles.formError,__source:{fileName:_jsxFileName,lineNumber:85}},
this.state.error?this.state.error:null)),

_react2.default.createElement(_reactNative.View,{style:_Styles.Styles.loginFormContainer,__source:{fileName:_jsxFileName,lineNumber:88}},
_react2.default.createElement(_reactNative.TextInput,{
keyboardType:'email-address',
onChangeText:function onChangeText(text){return _this3.handleFieldChange('email',text);},
value:this.state.email,
placeholder:'Enter your email address',__source:{fileName:_jsxFileName,lineNumber:89}}),

_react2.default.createElement(_reactNative.TextInput,{
secureTextEntry:true,
onChangeText:function onChangeText(text){return _this3.handleFieldChange('password',text);},
value:this.state.password,
placeholder:'Enter your password',__source:{fileName:_jsxFileName,lineNumber:95}}),

_react2.default.createElement(_rnButton.Button,{
text:'LOGIN',
onPress:function onPress(){return _this3.handleSubmit();},
disabled:!this.state.email||!this.state.password,
loading:this.state.loading,
loadingText:'Logging you in...',__source:{fileName:_jsxFileName,lineNumber:101}}))));}}]);return Login;}(_react2.default.Component);







Login.propTypes=propTypes;
Login.defaultProps=defaultProps;