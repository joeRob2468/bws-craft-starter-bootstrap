import Swiper, { Navigation } from 'swiper/core';

class ImageTextSlider {
    static selector = '.section-image_text_slider--block';

    constructor() {
        Swiper.use([Navigation]);
        this.sliders = [];
    }

    init() {
        let elements = $(ImageTextSlider.selector);
        if (elements.length) {
            elements.each((index, element) => {
                let slider = new Swiper($('.swiper-container', element)[0], {});

                slider.on('slideChange', (swiperInstance => {
                    this.updateNavigation(swiperInstance, element);
                }));

                $(element).on('click.image-text-slider', '[data-slide-index]', (event) => {
                    event.preventDefault();
                    this.navigateToSlide(slider, $(event.currentTarget).data('slide-index'));
                    this.updateNavigation(slider, element);
                });

                this.sliders.push(slider);
            });
        }
    }

    navigateToSlide(slider, slideIndex) {
        slider.slideTo(slideIndex);
    }

    updateNavigation(slider, element) {
        $('.slider-navigation-item', element).removeClass('active')
        $(`.slider-navigation-item[data-slide-index="${slider.realIndex}"]`, element).addClass('active');

        // scroll to slide on mobile (medium breakpoint in em, ripped from css)
        if ($(window).width() / parseFloat($('body').css('font-size')) <= 63.99875) {
            slider.el.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    destroy() {
        if (this.sliders.length) {
            // destroy slider instances
            for (let i = 0; i < this.sliders.length; i++) {
                let slider = this.sliders[i];
                slider.destroy();
            }
            
            // Destroy custom event listeners
            $(ImageTextSlider.selector).off('.image-text-slider');

            this.sliders = [];
        }
    }
}

export default ImageTextSlider;