(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contact-form"],{

/***/ "./src/js/block-modules/ContactForm.js":
/*!*********************************************!*\
  !*** ./src/js/block-modules/ContactForm.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _vue_ContactFormApp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vue/ContactFormApp.js */ "./src/js/vue/ContactFormApp.js");
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var ContactForm=/*#__PURE__*/function(){function ContactForm(){_classCallCheck(this,ContactForm);this.instances=[];}_createClass(ContactForm,[{key:"init",value:function init(){var _this=this;var elements=$(ContactForm.selector);if(elements.length){elements.each(function(index,element){var instance=Object(vue__WEBPACK_IMPORTED_MODULE_1__["createApp"])(_vue_ContactFormApp_js__WEBPACK_IMPORTED_MODULE_2__["default"]).mount(element);_this.instances.push(instance);});}}},{key:"destroy",value:function destroy(){if(this.instances.length){for(var i=0;i<this.instances.length;i++){var instance=this.instances[i];instance.destroy();}this.instances=[];}}}]);return ContactForm;}();_defineProperty(ContactForm,"selector",'.section-contact_form--block');/* harmony default export */ __webpack_exports__["default"] = (ContactForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/js/vue/ContactFormApp.js":
/*!**************************************!*\
  !*** ./src/js/vue/ContactFormApp.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! yup */ "./node_modules/yup/es/index.js");
function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{Promise.resolve(value).then(_next,_throw);}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value);}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err);}_next(undefined);});};}var ContactFormApp={delimiters:['${','}'],components:{Field:vee_validate__WEBPACK_IMPORTED_MODULE_4__["Field"],ValidationForm:vee_validate__WEBPACK_IMPORTED_MODULE_4__["Form"]},data:function data(){var schema=Object(yup__WEBPACK_IMPORTED_MODULE_5__["object"])().shape({email:Object(yup__WEBPACK_IMPORTED_MODULE_5__["string"])().required().email(),name:Object(yup__WEBPACK_IMPORTED_MODULE_5__["string"])().required(),phone:Object(yup__WEBPACK_IMPORTED_MODULE_5__["string"])().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,'Phone number not valid'),body:Object(yup__WEBPACK_IMPORTED_MODULE_5__["string"])().required()});return{initialized:false,ajaxError:false,submitting:false,submitted:false,buttonLabel:'SEND MESSAGE',schema:schema};},methods:{onSubmit:function onSubmit(values){var _this=this;return _asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(){var response;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_this.submitting=true;_this.submitted=false;_this.ajaxError=false;_this.buttonLabel='SENDING...';_context.prev=4;_context.next=7;return $.ajax({method:'post',url:'/',dataType:'json',headers:{'X-CSRF-Token':csrfTokenValue},data:{'fromName':values.name,'fromEmail':values.email,'message[Phone]':values.phone,'message[body]':values.body,'action':'contact-form/send'}}).promise();case 7:response=_context.sent;_this.submitting=false;_this.submitted=true;_this.buttonLabel='MESSAGE SENT!';if(typeof ga!=='undefined'){ga('send','event','Forms','Contact Submission','Contact form submitted');}_context.next=20;break;case 14:_context.prev=14;_context.t0=_context["catch"](4);_this.buttonLabel='SEND MESSAGE';_this.submitting=false;_this.ajaxError=true;console.log(_context.t0);case 20:case"end":return _context.stop();}}},_callee,null,[[4,14]]);}))();}},computed:{},watch:{},mounted:function mounted(){this.initialized=true;}};/* harmony default export */ __webpack_exports__["default"] = (ContactFormApp);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=contact-form.bundle.js.map