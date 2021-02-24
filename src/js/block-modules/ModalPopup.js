class ModalPopup {
    static selector = '.section-modal_popup[data-modal-popup]';

    constructor() {
        this.instances = [];
        this.anchors = [];
    }

    async init() {
        let elements = $(ModalPopup.selector);
        if (elements.length) {
            elements.each((index, element) => {
                this.instances.push(element);
                this.anchors.push('a[href="#' + element.getAttribute('data-modal-popup') + '"]'); // assemble list of anchor selectors, which we'll use to attach event listeners to anchor links
            });

            // open popup with same attribute value on click
            $('body').on('click.bws-modal-popup', '[data-modal-popup-trigger]', function (e) {
                let targetModalName = $(this).data('modal-popup-trigger');
                let targetModal = $('[data-modal-popup="' + targetModalName + '"]');
                if (targetModal.length) {
                    e.preventDefault();
                    targetModal.addClass('active');
                }
            });

            // open popup with matching anchor link handle on click
            $('body').on('click.bws-modal-popup', this.anchors.join(', '), function(e) {
                let target = $(e.target);
                let targetModalName = target.attr('href').substring(1);
                let targetModal = $('[data-modal-popup="' + targetModalName + '"]');
                if (targetModal.length) {
                    e.preventDefault();
                    targetModal.addClass('active');
                }
            });

            // close popups on click outside content area or on close button
            $('body').on('click.bws-modal-popup', '.modal-popup[data-modal-popup]', function (e) {
                let $target = $(e.target);
                if ($(this).is('.active') && ($target.is('[data-close-popup]') || !$target.closest('.popup-container').length)) {
                    e.preventDefault();
                    $(this).removeClass('active');
                }
            });
        }
    }

    destroy() {
        if (this.instances.length) {
            $('body').off('click.bws-modal-popup');
            this.instances = [];
            this.anchors = [];
        }
    }
}

export default ModalPopup;