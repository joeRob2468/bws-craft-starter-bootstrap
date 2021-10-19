(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["image-gallery"],{

/***/ "./src/js/block-modules/ImageGallery.js":
/*!**********************************************!*\
  !*** ./src/js/block-modules/ImageGallery.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var swiper_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper/core */ "./node_modules/swiper/swiper.esm.js");
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var ImageGallery=/*#__PURE__*/function(){function ImageGallery(){_classCallCheck(this,ImageGallery);swiper_core__WEBPACK_IMPORTED_MODULE_0__["default"].use([swiper_core__WEBPACK_IMPORTED_MODULE_0__["Navigation"],swiper_core__WEBPACK_IMPORTED_MODULE_0__["Autoplay"]]);this.sliders=[];}_createClass(ImageGallery,[{key:"init",value:function init(){var _this=this;var elements=$(ImageGallery.selector);if(elements.length){elements.each(function(index,element){var slider=new swiper_core__WEBPACK_IMPORTED_MODULE_0__["default"]($('.swiper-container',element)[0],{centeredSlides:true,loop:true,initialSlide:0,spaceBetween:15,slidesPerView:1.2,autoplay:{delay:4000},breakpoints:{1024:{spaceBetween:35,slidesPerView:1.4}}});_this.sliders.push(slider);});}}},{key:"destroy",value:function destroy(){if(this.sliders.length){// destroy slider instances
for(var i=0;i<this.sliders.length;i++){var slider=this.sliders[i];slider.destroy();}this.sliders=[];}}}]);return ImageGallery;}();_defineProperty(ImageGallery,"selector",'.section-image_gallery--block');/* harmony default export */ __webpack_exports__["default"] = (ImageGallery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=image-gallery.bundle.js.map