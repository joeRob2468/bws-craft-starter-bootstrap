import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

class NavigationController {
    constructor() {
        this.navigationContainer = null;
        this.mobileNavigationTrigger = null;
        this.mobileNavigationContainer = null;

        this.isMobileNavOpen = false;
    }

    init() {
        this.navigationContainer = $('.main-nav--section');
        this.mobileNavigationTrigger = $('.mobile-navigation-trigger-container .mobile-navigation-trigger', this.navigationContainer);
        this.mobileNavigationContainer = $('.mobile-navigation--menu', this.navigationContainer);

        this.mobileNavigationTrigger.on('click.bws-navigation-controller', (event) => this.toggleMobileNav(event));
    }

    toggleMobileNav(event) {
        event.preventDefault();

        if (this.isMobileNavOpen) {
            this.mobileNavigationContainer.removeClass('open');
            $('.is-parent', this.mobileNavigationContainer).removeClass('open');
            $('.is-parent .dropdown-expand-button').off('click.bws-navigation-controller');
            enableBodyScroll(this.mobileNavigationContainer[0]);
        } else {
            this.mobileNavigationContainer.addClass('open');
            $('.is-parent .dropdown-expand-button', this.mobileNavigationContainer).on('click.bws-navigation-controller', (event) => this.toggleAccordionItem(event));
            disableBodyScroll(this.mobileNavigationContainer[0]);
        }

        this.isMobileNavOpen = !this.isMobileNavOpen;
    }

    toggleAccordionItem(event) {
        event.preventDefault();
        let accordionItem = $(event.currentTarget).parent().closest('.is-parent');
        
        if (accordionItem.hasClass('open')) {
            accordionItem.removeClass('open');
            $('.is-parent', accordionItem).removeClass('open');
        } else {
            accordionItem.addClass('open');
        }
    }

    destroy() {
        clearAllBodyScrollLocks();
        this.mobileNavigationContainer.off('click.bws-navigation-controller');
        this.navigationContainer = null;
        this.mobileNavigationTrigger = null;
        this.mobileNavigationContainer = null;
    }
}

export default NavigationController;