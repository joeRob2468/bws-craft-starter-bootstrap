(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["qgive-form"],{

/***/ "./src/js/block-modules/QGiveForm.js":
/*!*******************************************!*\
  !*** ./src/js/block-modules/QGiveForm.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_ScriptLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/ScriptLoader */ "./src/js/utils/ScriptLoader.js");
function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{Promise.resolve(value).then(_next,_throw);}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value);}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err);}_next(undefined);});};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var QGiveForm=/*#__PURE__*/function(){function QGiveForm(){_classCallCheck(this,QGiveForm);this.instances=[];}_createClass(QGiveForm,[{key:"init",value:function(){var _init=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(){var _this=this;var elements,loader,qgive;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:elements=$(QGiveForm.selector);if(!elements.length){_context.next=8;break;}elements.each(function(index,element){_this.instances.push(element);});loader=new _utils_ScriptLoader__WEBPACK_IMPORTED_MODULE_3__["default"]({src:'secure.qgiv.com/resources/core/js/embed.js',global:'QGIV',protocol:'https:'});_context.next=6;return loader.load();case 6:qgive=_context.sent;if(typeof qgive!=='undefined'){qgive.Embed.init();}case 8:case"end":return _context.stop();}}},_callee);}));function init(){return _init.apply(this,arguments);}return init;}()},{key:"destroy",value:function destroy(){if(this.instances.length){this.instances=[];}}}]);return QGiveForm;}();_defineProperty(QGiveForm,"selector",'.section-qgive_form--block');/* harmony default export */ __webpack_exports__["default"] = (QGiveForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/js/utils/ScriptLoader.js":
/*!**************************************!*\
  !*** ./src/js/utils/ScriptLoader.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScriptLoader; });
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{Promise.resolve(value).then(_next,_throw);}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value);}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err);}_next(undefined);});};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}// Utility to load JS files at runtime by creating <script> embeds
// Inspired by this blog post: https://timber.io/snippets/asynchronously-load-a-script-in-the-browser-with-javascript/
var ScriptLoader=/*#__PURE__*/function(){function ScriptLoader(options){_classCallCheck(this,ScriptLoader);var src=options.src,global=options.global,_options$protocol=options.protocol,protocol=_options$protocol===void 0?document.location.protocol:_options$protocol;this.src=src;this.global=global;this.protocol=protocol;this.isLoaded=false;}_createClass(ScriptLoader,[{key:"loadScript",value:function loadScript(){var _this=this;return new Promise(function(resolve,reject){// Create script element and set attributes
var script=document.createElement('script');script.type='text/javascript';script.async=true;script.src=_this.protocol+"//"+_this.src;// Append the script to the DOM
var el=document.getElementsByTagName('script')[0];el.parentNode.insertBefore(script,el);// Resolve the promise once the script is loaded
script.addEventListener('load',function(){_this.isLoaded=true;resolve(script);});// Catch any errors while loading the script
script.addEventListener('error',function(){reject(new Error(_this.src+" failed to load."));});});}},{key:"load",value:function load(){var _this2=this;return new Promise(/*#__PURE__*/function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve,reject){return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(_this2.isLoaded){_context.next=17;break;}_context.prev=1;if(!(typeof window[_this2.global]!=='undefined')){_context.next=7;break;}_this2.isLoaded=true;resolve(window[_this2.global]);_context.next=10;break;case 7:_context.next=9;return _this2.loadScript();case 9:resolve(window[_this2.global]);case 10:_context.next=15;break;case 12:_context.prev=12;_context.t0=_context["catch"](1);reject(_context.t0);case 15:_context.next=18;break;case 17:resolve(window[_this2.global]);case 18:case"end":return _context.stop();}}},_callee,null,[[1,12]]);}));return function(_x,_x2){return _ref.apply(this,arguments);};}());}}]);return ScriptLoader;}();

/***/ })

}]);
//# sourceMappingURL=qgive-form.bundle.js.map