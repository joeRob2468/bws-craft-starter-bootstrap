import { Formie } from '../../../cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-lib';

class FormieForm {
    static selector = '.section-formie_form--block';

    constructor() {
        this.instances = [];
        this.forms = [];
    }

    init() {
        let elements = $(FormieForm.selector);
        if (elements.length) {
            elements.each((index, element) => {
                this.instances.push(element);

                if ($('form.fui-form', element).length) {
                    let formElement = $('form.fui-form', element)[0];
                    let formInstance = new Formie();
                    formInstance.initForm(formInstance);

                    this.forms.push({
                        element: formElement,
                        instance: formInstance
                    });
                }
            });
        }
    }

    destroy() {
        if (this.forms.length) {
            for (let i = 0; i < this.forms.length; i++) {
                let form = this.forms[i];
                form.instance.destroyForm(form.element);
            }

            this.forms = [];
        }

        if (this.instances.length) {
            this.instances = [];
        }
    }
}

export default FormieForm;