import { Field } from 'vee-validate';
import { Form as ValidationForm } from 'vee-validate';
import { object, string } from 'yup';

var ContactFormApp = {
    delimiters: ['${', '}'],
    components: {
        Field,
        ValidationForm
    },
    data() {
        const schema = object().shape({
            email: string().required().email(),
            name: string().required(),
            phone: string().matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/, 'Phone number not valid'),
            body: string().required()
        });

        return {
            initialized: false,
            ajaxError: false,
            submitting: false,
            submitted: false,
            buttonLabel: 'SEND MESSAGE',
            schema: schema
        }
    },
    methods: {
        async onSubmit(values) {
            this.submitting = true;
            this.submitted = false;
            this.ajaxError = false;
            this.buttonLabel = 'SENDING...';

            try {
                let response = await $.ajax({
                    method: 'post',
                    url: '/',
                    dataType: 'json',
                    headers: {
                        'X-CSRF-Token': csrfTokenValue
                    },
                    data: {
                        'fromName': values.name,
                        'fromEmail': values.email,
                        'message[Phone]': values.phone,
                        'message[body]': values.body,
                        'action': 'contact-form/send'
                    }
                }).promise();

                this.submitting = false;
                this.submitted = true;
                this.buttonLabel = 'MESSAGE SENT!';

                if (typeof (ga) !== 'undefined') {
                    ga('send', 'event', 'Forms', 'Contact Submission', 'Contact form submitted');
                }
            } catch (error) {
                this.buttonLabel = 'SEND MESSAGE';
                this.submitting = false;
                this.ajaxError = true;
                console.log(error);
            }
        }
    },
    computed: {
    },
    watch: {
    },
    mounted() {
        this.initialized = true;
    }
};

export default ContactFormApp;