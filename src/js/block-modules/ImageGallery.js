import { Swiper } from 'swiper';

class ImageGallery {
    static selector = '.section-image_gallery--block';

    constructor() {
        this.sliders = [];
    }

    init() {
        let elements = $(ImageGallery.selector);
        if (elements.length) {
            elements.each((index, element) => {
                let slider = new Swiper($('.swiper-container', element)[0], {
                    centeredSlides: true,
                    loop: true,
                    initialSlide: 0,
                    spaceBetween: 15,
                    slidesPerView: 1.2,
                    breakpoints: {
                        1024: {
                            spaceBetween: 35,
                            slidesPerView: 1.4
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

export default ImageGallery;