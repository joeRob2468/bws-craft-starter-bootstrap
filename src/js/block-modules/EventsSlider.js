import Swiper, { Navigation } from 'swiper/core';

class EventsSlider {
    static selector = '.section-events_slider--block';

    constructor() {
        Swiper.use([Navigation]);
        this.sliders = [];
    }

    init() {
        let elements = $(EventsSlider.selector);
        if (elements.length) {
            elements.each((index, element) => {
                let slider = new Swiper($('.swiper-container', element)[0], {
                    centeredSlides: true,
                    loop: false,
                    initialSlide: 0,
                    spaceBetween: 5,
                    slidesPerView: 1.2,
                    navigation: {
                        nextEl: $('.swiper-navigation', element).find('.swiper-button-next')[0],
                        prevEl: $('.swiper-navigation', element).find('.swiper-button-prev')[0],
                    },
                    breakpoints: {
                        1024: {
                            spaceBetween: 15,
                            slidesPerView: 3,
                            centeredSlides: false,
                            loop: false
                        }
                    }
                });
                this.sliders.push(slider);
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

            this.sliders = [];
        }
    }
}

export default EventsSlider;