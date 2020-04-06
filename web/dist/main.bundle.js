/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_site_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/site.js */ "./src/js/site.js");
/* global site imports */ //import 'normalize.css';


/***/ }),

/***/ "./src/js/ContactFormController.js":
/*!*****************************************!*\
  !*** ./src/js/ContactFormController.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_resource__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue-resource */ "./node_modules/vue-resource/dist/vue-resource.esm.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var ContactFormController=/*#__PURE__*/function(){function ContactFormController(){_classCallCheck(this,ContactFormController);vue__WEBPACK_IMPORTED_MODULE_9__["default"].use(vue_resource__WEBPACK_IMPORTED_MODULE_10__["default"]);vue__WEBPACK_IMPORTED_MODULE_9__["default"].use(vee_validate__WEBPACK_IMPORTED_MODULE_11__["default"],{classes:true});vee_validate__WEBPACK_IMPORTED_MODULE_11__["default"].Validator.extend('minLength',{getMessage:function getMessage(field,_ref){var _ref2=_slicedToArray(_ref,1),length=_ref2[0];return"At least "+length+" items must be selected.";},validate:function validate(value,_ref3){var _ref4=_slicedToArray(_ref3,1),length=_ref4[0];return value.length>=length;}});this._vm=null;}_createClass(ContactFormController,[{key:"init",value:function init(){this._vm=new vue__WEBPACK_IMPORTED_MODULE_9__["default"]({el:".contact-form-container form.contact-form",delimiters:['${','}'],data:{ajaxError:false,submitting:false,submitted:false,buttonLabel:'SEND MESSAGE',name:'',email:'',phone:'',organization:'',message:''},methods:{onSubmit:function onSubmit(){var _this=this;this.submitting=true;this.submitted=false;this.ajaxError=false;this.buttonLabel='SENDING...';this.$validator.validateAll().then(function(valid){if(valid){_this.$http.post('/',_this.getData(),{responseType:'json',emulateJSON:true}).then(function(res){_this.submitting=false;_this.submitted=true;_this.buttonLabel='MESSAGE SENT!';try{if((typeof ga==="undefined"?"undefined":_typeof(ga))!==undefined){ga('send','event','Forms','Contact Submission','Contact form submitted');}}catch(e){console.log(e);}},function(err){_this.buttonLabel='SEND MESSAGE';_this.submitting=false;_this.ajaxError=true;console.log(err);});}else{_this.buttonLabel='SEND MESSAGE';_this.submitting=false;}});},getData:function getData(){var data={'fromName':this.name,'fromEmail':this.email,'message[Phone]':this.phone,'message[Organization]':this.organization,'message[body]':this.message};data[csrfTokenName]=csrfTokenValue;data['action']='contact-form/send';return data;}}});}},{key:"destroy",value:function destroy(){this._vm.$destroy(true);this._vm=null;}}]);return ContactFormController;}();/* harmony default export */ __webpack_exports__["default"] = (ContactFormController);

/***/ }),

/***/ "./src/js/DefaultRenderer.js":
/*!***********************************!*\
  !*** ./src/js/DefaultRenderer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _dogstudio_highway__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @dogstudio/highway */ "./node_modules/@dogstudio/highway/build/highway.js");
/* harmony import */ var _dogstudio_highway__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_dogstudio_highway__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _MainController__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./MainController */ "./src/js/MainController.js");
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}var DefaultRenderer=/*#__PURE__*/function(_Highway$Renderer){_inherits(DefaultRenderer,_Highway$Renderer);function DefaultRenderer(properties){var _this;_classCallCheck(this,DefaultRenderer);_this=_possibleConstructorReturn(this,_getPrototypeOf(DefaultRenderer).call(this,properties));_this.mainController=new _MainController__WEBPACK_IMPORTED_MODULE_11__["default"]();return _this;}// Hooks/methods
_createClass(DefaultRenderer,[{key:"onEnter",value:function onEnter(){this.mainController.init();}},{key:"onLeave",value:function onLeave(){this.mainController.destroy();}},{key:"onEnterCompleted",value:function onEnterCompleted(){}},{key:"onLeaveCompleted",value:function onLeaveCompleted(){}}]);return DefaultRenderer;}(_dogstudio_highway__WEBPACK_IMPORTED_MODULE_10___default.a.Renderer);// Don`t forget to export your renderer
/* harmony default export */ __webpack_exports__["default"] = (DefaultRenderer);

/***/ }),

/***/ "./src/js/DefaultTransition.js":
/*!*************************************!*\
  !*** ./src/js/DefaultTransition.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-prototype-of */ "./node_modules/core-js/modules/es.object.get-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.set-prototype-of */ "./node_modules/core-js/modules/es.object.set-prototype-of.js");
/* harmony import */ var core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _dogstudio_highway__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @dogstudio/highway */ "./node_modules/@dogstudio/highway/build/highway.js");
/* harmony import */ var _dogstudio_highway__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_dogstudio_highway__WEBPACK_IMPORTED_MODULE_11__);
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}// Import Highway
var DefaultTransition=/*#__PURE__*/function(_Highway$Transition){_inherits(DefaultTransition,_Highway$Transition);function DefaultTransition(){_classCallCheck(this,DefaultTransition);return _possibleConstructorReturn(this,_getPrototypeOf(DefaultTransition).apply(this,arguments));}_createClass(DefaultTransition,[{key:"in",// Built-in methods
value:function _in(_ref){var from=_ref.from,to=_ref.to,trigger=_ref.trigger,done=_ref.done;window.scrollTo(0,0);from.remove();$('.revealer').removeClass('animate-in').addClass('animate-out');setTimeout(function(){$('.revealer').removeClass('animate-out');done();},600);}},{key:"out",value:function out(_ref2){var from=_ref2.from,trigger=_ref2.trigger,done=_ref2.done;$('.revealer').addClass('animate-in');setTimeout(function(){done();},600);}}]);return DefaultTransition;}(_dogstudio_highway__WEBPACK_IMPORTED_MODULE_11___default.a.Transition);// Don`t forget to export your transition
/* harmony default export */ __webpack_exports__["default"] = (DefaultTransition);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/js/MainController.js":
/*!**********************************!*\
  !*** ./src/js/MainController.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.timers */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! scrollmonitor */ "./node_modules/scrollmonitor/scrollMonitor.js");
/* harmony import */ var scrollmonitor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(scrollmonitor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _NavigationController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NavigationController */ "./src/js/NavigationController.js");
/* harmony import */ var _ContactFormController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ContactFormController */ "./src/js/ContactFormController.js");
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//import { Foundation } from 'foundation-sites/js/foundation.core';
// NOTE: Foundation scripts break IE11 and down, so don't use them.
var MainController=/*#__PURE__*/function(){// main class initialization - runs once on site load
function MainController(){_classCallCheck(this,MainController);// Create class variables
this.scrollMonitor=scrollmonitor__WEBPACK_IMPORTED_MODULE_2___default.a;//Foundation.addToJquery($);
this.scrollWatchers=[];this.navigationController=null;this.contactFormController=null;// hide preloader 
$('.revealer').removeClass('show').addClass('animate-out');setTimeout(function(){$('.revealer').removeClass('animate-out');},600);}// initialization - runs each time a new page is loaded
_createClass(MainController,[{key:"init",value:function init(){try{//$(document).foundation();
$('body').addClass('animations-enabled');var _instance=this;if(typeof ga==='function'){ga('send','pageview',location.pathname);}// initialize navigation controller
// this.navigationController = new NavigationController();
// this.navigationController.init();
// run element animations when in viewport (adds .is-active to visible elements as you scroll)
$('.animatable').each(function(index){// create two watchers - one with an offset for enter events, and one without an offset for exit events
// lets us add visibility classes with an offset, and remove them when the element is completely outside the visible viewport
var enterScrollWatcher=scrollMonitor.create($(this).get(0),-100);var exitScrollWatcher=scrollMonitor.create($(this).get(0),100);_instance.scrollWatchers.push(enterScrollWatcher);_instance.scrollWatchers.push(exitScrollWatcher);enterScrollWatcher.enterViewport(function(){$(this.watchItem).addClass('is-active');});exitScrollWatcher.exitViewport(function(){$(this.watchItem).removeClass('is-active');});// If any of the elements are visible, add the active class (after an initial delay, to facilitate page transition animation)
$(this).addClass('will-animate');$(this).removeClass('is-active');if(exitScrollWatcher.isInViewport){setTimeout(function(){$(exitScrollWatcher.watchItem).addClass('is-active');},50);}});}catch(e){console.log(e);}}// Runs every time a new page replaces the current one
// Destroys all scripts on the page, so they can be reinitialized on the new one
},{key:"destroy",value:function destroy(){try{// destroy navigation controller
// this.navigationController.destroy();
// this.navigationController = null;
// destroy element animation scroll watchers 
for(var i=0;i<this.scrollWatchers.length;i++){this.scrollWatchers[i].destroy();}this.scrollWatchers=[];//$(document).foundation('destroy');
}catch(e){console.log(e);}}}]);return MainController;}();/* harmony default export */ __webpack_exports__["default"] = (MainController);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/js/NavigationController.js":
/*!****************************************!*\
  !*** ./src/js/NavigationController.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var NavigationController=/*#__PURE__*/function(){function NavigationController(){_classCallCheck(this,NavigationController);this.navigationContainer=null;this.mobileNavToggle=null;this.scrollTimeout=null;this.tolerance=5;// the amount scrolled in one event before triggering pinning, used to stop flickering navbar on smooth scroll
this.pinnedOffset=50;// vertical offset in px before element is first unpinned
this.topClass='is-top';// class added to element when above offset
this.notTopClass='is-not-top';// class added to element when below offset
this.pinnedClass='is-pinned';// class added to element when pinned
this.unpinnedClass='is-unpinned';// class added to element when unpinned
this.frozen=false;// freezes pin and unpin class changes
this.isMobileNavOpen=false;this.lastKnownScrollY=0;// holds last known scroll position, used for pinning or unpinning the element
}_createClass(NavigationController,[{key:"init",value:function init(){// this.navigationContainer = $('.main-nav-container');
// this.mobileNavToggle = $('button.mobile-nav-toggle', this.navigationContainer);
// $(window).on('scroll.bws-navigation-controller', (event) => this.onScroll(event));
// this.mobileNavToggle.on('click.bws-navigation-controller', (event) => this.toggleMobileNav(event));
// this.onScroll(null); // trigger event once to add initial classes
}},{key:"onScroll",value:function onScroll(event){var _this=this;// If there's a scroll timer already existing, cancel it
if(this.scrollTimeout){window.cancelAnimationFrame(this.scrollTimeout);}// Setup the new requestAnimationFrame
this.scrollTimeout=window.requestAnimationFrame(function(){var currentScrollY=$(document).scrollTop();var scrollDirection=currentScrollY>_this.lastKnownScrollY?'down':'up';// set top or not top based on current scroll position and offset
if(currentScrollY>=_this.pinnedOffset){_this.setNotTop();}else{_this.setTop();}// set pinned or not based on distance scrolled and direction
if(scrollDirection==='down'&&currentScrollY>=_this.lastKnownScrollY&&Math.abs(currentScrollY-_this.lastKnownScrollY)>=_this.tolerance){_this.setUnpinned();}else if(scrollDirection==='up'&&currentScrollY<=_this.lastKnownScrollY&&Math.abs(currentScrollY-_this.lastKnownScrollY)>=_this.tolerance){_this.setPinned();}_this.lastKnownScrollY=currentScrollY;});}},{key:"toggleMobileNav",value:function toggleMobileNav(event){if(this.isMobileNavOpen){// this.mobileNavToggle.removeClass('is-active');
// $('.page-wrapper').removeClass('mobile-nav-active');
// $('ul.menu', this.navigationContainer).removeClass('is-active');
// $('ul.menu .menu-item a', this.navigationContainer).off('click.bws-navigation-controller');
// this.frozen = false;
}else{// this.mobileNavToggle.addClass('is-active');
// $('.page-wrapper').addClass('mobile-nav-active');
// $('ul.menu', this.navigationContainer).addClass('is-active');
// $('ul.menu .menu-item a', this.navigationContainer).on('click.bws-navigation-controller', (event) => this.toggleMobileNav(event));
// this.frozen = true;
}this.isMobileNavOpen=!this.isMobileNavOpen;}},{key:"freezePinning",value:function freezePinning(){this.frozen=true;}},{key:"unfreezePinning",value:function unfreezePinning(){this.frozen=false;}},{key:"setTop",value:function setTop(){if(this.navigationContainer.hasClass(this.notTopClass)){this.navigationContainer.removeClass(this.notTopClass);}if(!this.navigationContainer.hasClass(this.topClass)){this.navigationContainer.addClass(this.topClass);}}},{key:"setNotTop",value:function setNotTop(){if(this.navigationContainer.hasClass(this.topClass)){this.navigationContainer.removeClass(this.topClass);}if(!this.navigationContainer.hasClass(this.notTopClass)){this.navigationContainer.addClass(this.notTopClass);}}},{key:"setPinned",value:function setPinned(){if(!this.frozen){if(this.navigationContainer.hasClass(this.unpinnedClass)){this.navigationContainer.removeClass(this.unpinnedClass);}if(!this.navigationContainer.hasClass(this.pinnedClass)){this.navigationContainer.addClass(this.pinnedClass);}}}},{key:"setUnpinned",value:function setUnpinned(){if(!this.frozen){if(this.navigationContainer.hasClass(this.pinnedClass)){this.navigationContainer.removeClass(this.pinnedClass);}if(!this.navigationContainer.hasClass(this.unpinnedClass)){this.navigationContainer.addClass(this.unpinnedClass);}}}},{key:"destroy",value:function destroy(){window.removeEventListener('scroll',this.onScroll);this.mobileNavToggle.off('click.bws-navigation-controller');//$('ul.menu .menu-item a', this.navigationContainer).off('click.bws-navigation-controller');
this.mobileNavToggle=null;this.scrollTimeout=null;this.navigationContainer=null;this.lastKnownScrollY=0;}}]);return NavigationController;}();/* harmony default export */ __webpack_exports__["default"] = (NavigationController);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/js/site.js":
/*!************************!*\
  !*** ./src/js/site.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lazysizes_plugins_respimg_ls_respimg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lazysizes/plugins/respimg/ls.respimg */ "./node_modules/lazysizes/plugins/respimg/ls.respimg.js");
/* harmony import */ var lazysizes_plugins_respimg_ls_respimg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lazysizes_plugins_respimg_ls_respimg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dogstudio_highway__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dogstudio/highway */ "./node_modules/@dogstudio/highway/build/highway.js");
/* harmony import */ var _dogstudio_highway__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dogstudio_highway__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DefaultRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DefaultRenderer */ "./src/js/DefaultRenderer.js");
/* harmony import */ var _DefaultTransition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DefaultTransition */ "./src/js/DefaultTransition.js");
/* harmony import */ var _MainController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MainController */ "./src/js/MainController.js");
$(function(){var H=new _dogstudio_highway__WEBPACK_IMPORTED_MODULE_2___default.a.Core({renderers:{common:_DefaultRenderer__WEBPACK_IMPORTED_MODULE_3__["default"]},transitions:{common:_DefaultTransition__WEBPACK_IMPORTED_MODULE_4__["default"],default:_DefaultTransition__WEBPACK_IMPORTED_MODULE_4__["default"]}});});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):\nError: Node Sass does not yet support your current environment: Linux 64-bit with Unsupported runtime (79)\nFor more information on which environments are supported please see:\nhttps://github.com/sass/node-sass/releases/tag/v4.12.0\n    at module.exports (/var/www/node_modules/node-sass/lib/binding.js:13:13)\n    at Object.<anonymous> (/var/www/node_modules/node-sass/lib/index.js:14:35)\n    at Module._compile (/var/www/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1167:10)\n    at Module.load (internal/modules/cjs/loader.js:996:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:896:14)\n    at Module.require (internal/modules/cjs/loader.js:1036:19)\n    at require (/var/www/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)\n    at getDefaultSassImpl (/var/www/node_modules/sass-loader/lib/loader.js:203:10)\n    at Object.sassLoader (/var/www/node_modules/sass-loader/lib/loader.js:79:31)\n    at /var/www/node_modules/webpack/lib/NormalModule.js:313:20\n    at /var/www/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /var/www/node_modules/loader-runner/lib/LoaderRunner.js:233:18\n    at runSyncOrAsync (/var/www/node_modules/loader-runner/lib/LoaderRunner.js:143:3)\n    at iterateNormalLoaders (/var/www/node_modules/loader-runner/lib/LoaderRunner.js:232:2)\n    at Array.<anonymous> (/var/www/node_modules/loader-runner/lib/LoaderRunner.js:205:4)\n    at Storage.finished (/var/www/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:43:16)\n    at /var/www/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:79:9\n    at /var/www/node_modules/graceful-fs/graceful-fs.js:90:16\n    at FSReqCallback.readFileAfterClose [as oncomplete] (internal/fs/read_file_context.js:63:3)");

/***/ }),

/***/ 0:
/*!*********************!*\
  !*** got (ignored) ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map