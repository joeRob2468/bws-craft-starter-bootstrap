(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["icons-library"],{

/***/ "./src/js/IconLibrary.js":
/*!*******************************!*\
  !*** ./src/js/IconLibrary.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var feather_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! feather-icons */ "./node_modules/feather-icons/dist/feather.js");
/* harmony import */ var feather_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(feather_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var IconLibrary=/*#__PURE__*/function(){// main class initialization - runs once on site load
function IconLibrary(){_classCallCheck(this,IconLibrary);}// initialization - runs each time a new page is loaded
_createClass(IconLibrary,[{key:"init",value:function init(){try{// replace feather markup with SVGs
feather_icons__WEBPACK_IMPORTED_MODULE_2___default.a.replace({class:'icon'});// add fontawesome icons to library
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["fas"],_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_5__["fab"]);// watch dom for fontawesome icon replacements
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__["dom"].watch();}catch(e){console.log(e);}}// Runs every time a new page replaces the current one
// Destroys all scripts on the page, so they can be reinitialized on the new one
},{key:"destroy",value:function destroy(){try{}catch(e){console.log(e);}}}]);return IconLibrary;}();/* harmony default export */ __webpack_exports__["default"] = (IconLibrary);

/***/ })

}]);
//# sourceMappingURL=icons-library.bundle.js.map