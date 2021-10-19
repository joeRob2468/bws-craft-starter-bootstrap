(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["image-text-slider"],{

/***/ "./src/js/block-modules/ImageTextSlider.js":
/*!*************************************************!*\
  !*** ./src/js/block-modules/ImageTextSlider.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var swiper_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper/core */ "./node_modules/swiper/swiper.esm.js");
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var ImageTextSlider=/*#__PURE__*/function(){function ImageTextSlider(){_classCallCheck(this,ImageTextSlider);swiper_core__WEBPACK_IMPORTED_MODULE_0__["default"].use([swiper_core__WEBPACK_IMPORTED_MODULE_0__["Navigation"]]);this.sliders=[];}_createClass(ImageTextSlider,[{key:"init",value:function init(){var _this=this;var elements=$(ImageTextSlider.selector);if(elements.length){elements.each(function(index,element){var slider=new swiper_core__WEBPACK_IMPORTED_MODULE_0__["default"]($('.swiper-container',element)[0],{});slider.on('slideChange',function(swiperInstance){_this.updateNavigation(swiperInstance,element);});$(element).on('click.image-text-slider','[data-slide-index]',function(event){event.preventDefault();_this.navigateToSlide(slider,$(event.currentTarget).data('slide-index'));_this.updateNavigation(slider,element);});_this.sliders.push(slider);});}}},{key:"navigateToSlide",value:function navigateToSlide(slider,slideIndex){slider.slideTo(slideIndex);}},{key:"updateNavigation",value:function updateNavigation(slider,element){$('.slider-navigation-item',element).removeClass('active');$(".slider-navigation-item[data-slide-index=\""+slider.realIndex+"\"]",element).addClass('active');// scroll to slide on mobile (medium breakpoint in em, ripped from css)
if($(window).width()/parseFloat($('body').css('font-size'))<=63.99875){slider.el.scrollIntoView({behavior:'smooth'});}}},{key:"destroy",value:function destroy(){if(this.sliders.length){// destroy slider instances
for(var i=0;i<this.sliders.length;i++){var slider=this.sliders[i];slider.destroy();}// Destroy custom event listeners
$(ImageTextSlider.selector).off('.image-text-slider');this.sliders=[];}}}]);return ImageTextSlider;}();_defineProperty(ImageTextSlider,"selector",'.section-image_text_slider--block');/* harmony default export */ __webpack_exports__["default"] = (ImageTextSlider);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=image-text-slider.bundle.js.map