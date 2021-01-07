import 'regenerator-runtime/runtime';
import { createApp } from 'vue';
import ContactFormApp from '../vue/ContactFormApp.js';

class ContactForm {
    static selector = '.section-contact_form--block';

    constructor() {
        this.instances = [];
    }

    init() {
        let elements = $(ContactForm.selector);
        if (elements.length) {
            elements.each((index, element) => {
                let instance = createApp(ContactFormApp).mount(element);
                this.instances.push(instance);
            });
        }
    }

    destroy() {
        if (this.instances.length) {
            for (let i = 0; i < this.instances.length; i++) {
                let instance = this.instances[i];
                instance.destroy();
            }

            this.instances = [];
        }
    }
}

export default ContactForm;