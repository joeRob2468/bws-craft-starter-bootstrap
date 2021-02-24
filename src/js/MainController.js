import ScrollMonitor from 'scrollmonitor';
import lity from 'lity';

import NavigationController from './NavigationController';

class MainController {
    // main class initialization - runs once on site load
    constructor() {
        // Create class variables
        this.scrollMonitor = ScrollMonitor;
        this.scrollWatchers = [];
        this.navigationController = null;
        this.iconLibrary = null;
        this.content_block_modules = [];

        // hide preloader 
        $('.revealer').removeClass('show').addClass('animate-out');
        setTimeout(function () {
            $('.revealer').removeClass('animate-out');
        }, 600);
    }

    // initialization - runs each time a new page is loaded
    init() {
        try {
            //$(document).foundation();
            $('body').addClass('animations-enabled');
            var _instance = this;

            if (typeof ga === 'function') {
                ga('send', 'pageview', location.pathname);
            }

            // initialize navigation controller
            this.navigationController = new NavigationController();
            this.navigationController.init();

            // initiate lity lightboxes
            $(document).on('click.bws', '[data-lightbox]', lity);

            // run element animations when in viewport (adds .is-active to visible elements as you scroll)
            $('.animatable').each(function (index) {
                // create two watchers - one with an offset for enter events, and one without an offset for exit events
                // lets us add visibility classes with an offset, and remove them when the element is completely outside the visible viewport
                let enterScrollWatcher = scrollMonitor.create($(this).get(0), -100);
                let exitScrollWatcher = scrollMonitor.create($(this).get(0), 100);
                _instance.scrollWatchers.push(enterScrollWatcher);
                _instance.scrollWatchers.push(exitScrollWatcher);


                enterScrollWatcher.enterViewport(function () {
                    $(this.watchItem).addClass('is-active');
                });

                exitScrollWatcher.exitViewport(function () {
                    $(this.watchItem).removeClass('is-active');
                });

                // If any of the elements are visible, add the active class (after an initial delay, to facilitate page transition animation)
                $(this).addClass('will-animate');
                $(this).removeClass('is-active');

                if (exitScrollWatcher.isInViewport) {
                    setTimeout(() => {
                        $(exitScrollWatcher.watchItem).addClass('is-active');
                    }, 50);
                }
            });

            // import icons library and dependencies, initialize when done
            import(/* webpackChunkName: "icons-library" */"./IconLibrary").then(module => {
                const IconLibrary = module.default;

                this.iconLibrary = new IconLibrary();
                this.iconLibrary.init();
            });

            this.initContentBlockModules();
        } catch (e) {
            console.log(e);
        }
    }

    // Called in init() method - initializes all content block modules
    initContentBlockModules() {
        // init contact form
        if ($('.section-contact_form--block').length) {
            import(/* webpackChunkName: "contact-form" */"./block-modules/ContactForm").then(module => {
                const ContactForm = module.default;

                if ($(ContactForm.selector).length) {
                    let contactForm = new ContactForm();
                    contactForm.init();
                    this.content_block_modules.push(contactForm);
                }
            });
        }

        // init image/text slider
        if ($('.section-image_text_slider--block').length) {
            import(/* webpackChunkName: "image-text-slider" */"./block-modules/ImageTextSlider").then(module => {
                const ImageTextSlider = module.default;

                if ($(ImageTextSlider.selector).length) {
                    let imageTextSlider = new ImageTextSlider();
                    imageTextSlider.init();
                    this.content_block_modules.push(imageTextSlider);
                }
            });
        }

        // init image gallery
        if ($('.section-image_gallery--block').length) {
            import(/* webpackChunkName: "image-gallery" */"./block-modules/ImageGallery").then(module => {
                const ImageGallery = module.default;

                if ($(ImageGallery.selector).length) {
                    let imageGallery = new ImageGallery();
                    imageGallery.init();
                    this.content_block_modules.push(imageGallery);
                }
            });
        }

        // init events slider
        if ($('.section-events_slider--block').length) {
            import(/* webpackChunkName: "events-slider" */"./block-modules/EventsSlider").then(module => {
                const EventsSlider = module.default;

                if ($(EventsSlider.selector).length) {
                    let eventsSlider = new EventsSlider();
                    eventsSlider.init();
                    this.content_block_modules.push(eventsSlider);
                }
            });
        }

        // init formie form
        if ($('.section-formie_form--block').length) {
            import(/* webpackChunkName: "formie-form" */"./block-modules/FormieForm").then(module => {
                const FormieForm = module.default;

                if ($(FormieForm.selector).length) {
                    let formieForm = new FormieForm();
                    formieForm.init();
                    this.content_block_modules.push(formieForm);
                }
            });
        }

        // init qgive form
        if ($('.section-qgive_form--block').length) {
            import(/* webpackChunkName: "qgive-form" */"./block-modules/QGiveForm").then(module => {
                const QGiveForm = module.default;

                if ($(QGiveForm.selector).length) {
                    let qgiveForm = new QGiveForm();
                    qgiveForm.init();
                    this.content_block_modules.push(qgiveForm);
                }
            });
        }

        // init modal popups
        if ($('.section-modal_popup[data-modal-popup]').length) {
            import(/* webpackChunkName: "modal-popup" */"./block-modules/ModalPopup").then(module => {
                const ModalPopup = module.default;

                if ($(ModalPopup.selector).length) {
                    let modalPopup = new ModalPopup();
                    modalPopup.init();
                    this.content_block_modules.push(modalPopup);
                }
            });
        }
    }

    // Runs every time a new page replaces the current one
    // Destroys all scripts on the page, so they can be reinitialized on the new one
    destroy() {
        try {
            // destroy lity lightboxes
            $(document).off('click.bws', '[data-lightbox]');

            // destroy content blocks
            for (let i=0; i < this.content_block_modules.length; i++) {
                this.content_block_modules[i].destroy();
            }
            this.content_block_modules = [];

            // destroy navigation controller
            this.navigationController.destroy();
            this.navigationController = null;

            // destroy fonts
            if (typeof this.iconLibrary !== 'undefined') {
                this.iconLibrary.destroy();
                this.iconLibrary = null;
            }

            // destroy element animation scroll watchers 
            for (let i = 0; i < this.scrollWatchers.length; i++) {
                this.scrollWatchers[i].destroy();
            }

            this.scrollWatchers = [];
        } catch (e) {
            console.log(e);
        }
    }
}

export default MainController;