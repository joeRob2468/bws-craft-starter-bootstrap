(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["formie-form"],{

/***/ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-form-base.js":
/*!************************************************************************************!*\
  !*** ./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-form-base.js ***!
  \************************************************************************************/
/*! exports provided: FormieFormBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormieFormBase", function() { return FormieFormBase; });
/* harmony import */ var _formie_form_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formie-form-theme */ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-form-theme.js");
const globals = __webpack_require__(/*! ./utils/globals */ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/globals.js");


class FormieFormBase {
  constructor(config = {}) {
    this.formId = `#${config.formHashId}`;
    this.$form = document.querySelector(this.formId);
    this.config = config;
    this.settings = config.settings;
    this.listeners = {};

    if (!this.$form) {
      return;
    }

    this.$form.form = this;

    if (this.settings.outputJsTheme) {
      this.formTheme = new _formie_form_theme__WEBPACK_IMPORTED_MODULE_0__["FormieFormTheme"](this.config);
    } // Add helper classes to fields when their inputs are focused, have values etc.


    this.registerFieldEvents(this.$form); // Hijack the form's submit handler, in case we need to do something

    this.addEventListener(this.$form, 'submit', e => {
      e.preventDefault();
      const beforeSubmitEvent = new CustomEvent('onBeforeFormieSubmit', {
        bubbles: true,
        cancelable: true,
        detail: {
          submitHandler: this
        }
      });

      if (!this.$form.dispatchEvent(beforeSubmitEvent)) {
        return;
      } // Add a little delay for UX


      setTimeout(() => {
        const validateEvent = new CustomEvent('onFormieValidate', {
          bubbles: true,
          cancelable: true,
          detail: {
            submitHandler: this
          }
        });

        if (!this.$form.dispatchEvent(validateEvent)) {
          return;
        }

        this.submitForm();
      }, 300);
    }, false);
  }

  submitForm() {
    // Check if we're going back, and attach an input to tell formie not to validate
    if (this.$form.goToPage) {
      const $backButtonInput = document.createElement('input');
      $backButtonInput.setAttribute('type', 'hidden');
      $backButtonInput.setAttribute('name', 'goToPageId');
      $backButtonInput.setAttribute('value', this.$form.goToPage);
      this.$form.appendChild($backButtonInput);
    }

    const submitEvent = new CustomEvent('onFormieSubmit', {
      bubbles: true,
      cancelable: true,
      detail: {
        submitHandler: this
      }
    });

    if (!this.$form.dispatchEvent(submitEvent)) {
      return;
    }

    if (this.settings.submitMethod === 'ajax') {
      this.formAfterSubmit();
    } else {
      this.$form.submit();
    }
  }

  formAfterSubmit(data = {}) {
    this.$form.dispatchEvent(new CustomEvent('onAfterFormieSubmit', {
      bubbles: true,
      detail: data
    }));
  }

  formSubmitError(data = {}) {
    this.$form.dispatchEvent(new CustomEvent('onFormieSubmitError', {
      bubbles: true,
      detail: data
    }));
  }

  registerFieldEvents($element) {
    const $wrappers = $element.querySelectorAll('.fui-field');
    $wrappers.forEach($wrapper => {
      const $input = $wrapper.querySelector('.fui-input, .fui-select');

      if ($input) {
        this.addEventListener($input, 'input', event => {
          $wrapper.dispatchEvent(new CustomEvent('input', {
            bubbles: false,
            detail: {
              input: event.target
            }
          }));
        });
        this.addEventListener($input, 'focus', event => {
          $wrapper.dispatchEvent(new CustomEvent('focus', {
            bubbles: false,
            detail: {
              input: event.target
            }
          }));
        });
        this.addEventListener($input, 'blur', event => {
          $wrapper.dispatchEvent(new CustomEvent('blur', {
            bubbles: false,
            detail: {
              input: event.target
            }
          }));
        });
        $wrapper.dispatchEvent(new CustomEvent('init', {
          bubbles: false,
          detail: {
            input: $input
          }
        }));
      }
    });
  }

  addEventListener(element, event, func) {
    this.listeners[event] = {
      element,
      func
    };
    element.addEventListener(event.split('.')[0], this.listeners[event].func);
  }

  removeEventListener(event) {
    let eventInfo = this.listeners[event] || {};

    if (eventInfo && eventInfo.element && eventInfo.func) {
      eventInfo.element.removeEventListener(event.split('.')[0], eventInfo.func);
      delete this.listeners[event];
    }
  }

}

/***/ }),

/***/ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-form-theme.js":
/*!*************************************************************************************!*\
  !*** ./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-form-theme.js ***!
  \*************************************************************************************/
/*! exports provided: FormieFormTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormieFormTheme", function() { return FormieFormTheme; });
/* harmony import */ var _utils_bouncer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/bouncer */ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/bouncer.js");

class FormieFormTheme {
  constructor(config = {}) {
    this.formId = `#${config.formHashId}`;
    this.$form = document.querySelector(this.formId);
    this.config = config;
    this.settings = config.settings;
    this.validationOnSubmit = !!this.settings.validationOnSubmit;
    this.validationOnFocus = !!this.settings.validationOnFocus;
    this.setCurrentPage(this.settings.currentPageId);

    if (!this.$form) {
      return;
    }

    this.$form.formTheme = this;
    this.form = this.$form.form;
    this.initValidator(); // Check if this is a success page and if we need to hide the notice
    // This is for non-ajax forms, where the page has reloaded

    this.hideSuccess(); // Hijack the form's submit handler, in case we need to do something

    this.addSubmitEventListener(); // Save the form's current state so we can tell if its changed later on

    this.savedFormHash = this.hashForm(); // Listen to form changes if the user tries to reload

    if (this.settings.enableUnloadWarning) {
      this.addFormUnloadEventListener();
    }
  }

  initValidator() {
    // Kick off validation - use this even if disabling client-side validation
    // so we can use a nice API handle server-side errprs
    var validatorSettings = {
      fieldClass: 'fui-error',
      errorClass: 'fui-error-message',
      fieldPrefix: 'fui-field-',
      errorPrefix: 'fui-error-',
      messageAfterField: true,
      messageCustom: 'data-fui-message',
      messageTarget: 'data-fui-target',
      validateOnBlur: this.validationOnFocus,
      // Call validation on-demand
      validateOnSubmit: false,
      disableSubmit: false,
      customValidations: {},
      messages: {
        missingValue: {
          checkbox: t('This field is required.'),
          radio: t('Please select a value.'),
          select: t('Please select a value.'),
          'select-multiple': t('Please select at least one value.'),
          default: t('Please fill out this field.')
        },
        patternMismatch: {
          email: t('Please enter a valid email address.'),
          url: t('Please enter a URL.'),
          number: t('Please enter a number'),
          color: t('Please match the following format: #rrggbb'),
          date: t('Please use the YYYY-MM-DD format'),
          time: t('Please use the 24-hour time format. Ex. 23:00'),
          month: t('Please use the YYYY-MM format'),
          default: t('Please match the requested format.')
        },
        outOfRange: {
          over: t('Please select a value that is no more than {max}.'),
          under: t('Please select a value that is no less than {min}.')
        },
        wrongLength: {
          over: t('Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.'),
          under: t('Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.')
        },
        fallback: t('There was an error with this field.')
      }
    }; // Allow other modules to modify our validator settings (for custom rules and messages)

    const registerFormieValidation = new CustomEvent('registerFormieValidation', {
      bubbles: true,
      detail: {
        validatorSettings
      }
    }); // Give a small amount of time for other JS scripts to register validations. These are lazy-loaded.
    // Maybe re-think this so we don't have to deal with event listener registration before/after dispatch?

    setTimeout(() => {
      this.$form.dispatchEvent(registerFormieValidation);
      this.validator = new _utils_bouncer__WEBPACK_IMPORTED_MODULE_0__["Bouncer"](this.formId, registerFormieValidation.detail.validatorSettings);
    }, 500); // After we clear any error, validate the fielset again. Mostly so we can remove global errors

    this.form.addEventListener(this.$form, 'bouncerRemoveError', e => {
      this.validate(false);
    }); // Override error messages defined in DOM - Bouncer only uses these as a last resort
    // In future updates, we can probably remove this

    this.form.addEventListener(this.$form, 'bouncerShowError', e => {
      var $field = e.target;
      var $fieldContainer = $field.closest('.fui-field');
      var message = $field.getAttribute('data-fui-message'); // If there's a server error, it takes priority.

      if (e.detail && e.detail.errors && e.detail.errors.serverMessage) {
        message = e.detail.errors.serverMessage;
      } // Check if we need to move the error out of the .fui-input-container node.
      // Only the input itself should be in here.


      var $errorToMove = $field.parentNode.querySelector('.fui-error-message');

      if ($errorToMove && $errorToMove.parentNode.parentNode) {
        $errorToMove.parentNode.parentNode.appendChild($errorToMove);
      } // The error has been moved, find it again


      if ($fieldContainer) {
        var $error = $fieldContainer.querySelector('.fui-error-message');

        if ($error && message) {
          $error.textContent = message;
        }
      }
    }, false);
  }

  addSubmitEventListener() {
    var $submitBtns = this.$form.querySelectorAll('[type="submit"]'); // Forms can have multiple submit buttons, and its easier to assign the currently clicked one
    // than tracking it through the submit handler.

    $submitBtns.forEach($submitBtn => {
      this.form.addEventListener($submitBtn, 'click', e => {
        this.$submitBtn = e.target; // Store for later if we're using text spinner

        this.originalButtonText = e.target.textContent.trim();
      });
    });
    this.form.addEventListener(this.$form, 'onBeforeFormieSubmit', this.onBeforeSubmit.bind(this));
    this.form.addEventListener(this.$form, 'onFormieValidate', this.onValidate.bind(this));
    this.form.addEventListener(this.$form, 'onFormieSubmit', this.onSubmit.bind(this));
    this.form.addEventListener(this.$form, 'onFormieSubmitError', this.onSubmitError.bind(this));
  }

  onBeforeSubmit(e) {
    this.beforeSubmit(); // Save for later to trigger real submit

    this.submitHandler = e.detail.submitHandler;
  }

  onValidate(e) {
    // Bypass validation and custom event handling if going back
    if (!this.$form.goToPage && !this.validate()) {
      this.onFormError(); // Set a flag on the event, so other listeners can potentially do something

      e.detail.invalid = true;
      e.preventDefault();
    }
  }

  onSubmit(e) {
    // Stop base behaviour of just submitting the form
    e.preventDefault(); // Either staight submit, or use Ajax

    if (this.settings.submitMethod === 'ajax') {
      this.ajaxSubmit();
    } else {
      // Before a server-side submit, refresh the saved hash immediately. Otherwise, the native submit
      // handler - which technically unloads the page - will trigger the changed alert.
      this.savedFormHash = this.hashForm();
      this.$form.submit();
    }
  }

  onSubmitError(e) {
    this.onFormError();
  }

  addFormUnloadEventListener() {
    this.form.addEventListener(window, 'beforeunload', e => {
      if (this.savedFormHash !== this.hashForm()) {
        e.returnValue = t('Are you sure you want to leave?');
      }
    });
  }

  hashForm() {
    var hash = {};
    var formData = new FormData(this.$form);
    var excludedItems = ['g-recaptcha-response', 'CRAFT_CSRF_TOKEN'];

    for (var pair of formData.entries()) {
      if (!excludedItems.includes(pair[0])) {
        // eslint-disable-next-line
        hash[pair[0]] = pair[1];
      }
    }

    return JSON.stringify(hash);
  }

  validate(focus = true) {
    if (!this.validationOnSubmit) {
      return true;
    }

    var $fieldset = this.$form;

    if (this.$currentPage) {
      $fieldset = this.$currentPage;
    }

    var invalidFields = this.validator.validateAll($fieldset); // If there are errors, focus on the first one

    if (invalidFields.length > 0 && focus) {
      invalidFields[0].focus();
    } // Remove any global errors if none - just in case


    if (invalidFields.length === 0) {
      this.removeFormAlert();
    }

    return !invalidFields.length;
  }

  hideSuccess() {
    var $successMessage = this.$form.parentNode.querySelector('.fui-alert-success');

    if ($successMessage && this.settings.submitActionMessageTimeout) {
      var timeout = parseInt(this.settings.submitActionMessageTimeout, 10) * 1000;
      setTimeout(() => {
        $successMessage.remove();
      }, timeout);
    }
  }

  addLoading() {
    if (this.$submitBtn) {
      // Always disable the button
      this.$submitBtn.setAttribute('disabled', true);

      if (this.settings.loadingIndicator === 'spinner') {
        this.$submitBtn.classList.add('fui-loading');
      }

      if (this.settings.loadingIndicator === 'text') {
        this.$submitBtn.textContent = this.settings.loadingIndicatorText;
      }
    }
  }

  removeLoading() {
    if (this.$submitBtn) {
      // Always enable the button
      this.$submitBtn.removeAttribute('disabled');

      if (this.settings.loadingIndicator === 'spinner') {
        this.$submitBtn.classList.remove('fui-loading');
      }

      if (this.settings.loadingIndicator === 'text') {
        this.$submitBtn.textContent = this.originalButtonText;
      }
    }
  }

  onFormError(errorMessage) {
    if (errorMessage) {
      this.showFormAlert(errorMessage, 'error');
    } else {
      this.showFormAlert(this.settings.errorMessage, 'error');
    }

    this.removeLoading();
  }

  showFormAlert(text, type) {
    var $alert = this.$form.parentNode.querySelector('.fui-alert'); // Strip <p> tags

    text = text.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '');

    if ($alert) {
      // We have to cater for HTML entities - quick-n-dirty
      if ($alert.innerHTML !== this.decodeHtml(text)) {
        $alert.innerHTML = $alert.innerHTML + '<br>' + text;
      }
    } else {
      $alert = document.createElement('div');
      $alert.className = 'fui-alert fui-alert-' + type;
      $alert.setAttribute('role', 'alert');
      $alert.innerHTML = text; // For error notices, we have potential special handling on position

      if (type == 'error') {
        $alert.className += ' fui-alert-' + this.settings.errorMessagePosition;

        if (this.settings.errorMessagePosition == 'bottom-form') {
          this.$submitBtn.parentNode.parentNode.insertBefore($alert, this.$submitBtn.parentNode);
        } else {
          this.$form.parentNode.insertBefore($alert, this.$form);
        }
      } else {
        $alert.className += ' fui-alert-' + this.settings.submitActionMessagePosition;

        if (this.settings.submitActionMessagePosition == 'bottom-form') {
          // An even further special case when hiding the form!
          if (this.settings.submitActionFormHide) {
            this.$form.parentNode.insertBefore($alert, this.$form);
          } else {
            this.$submitBtn.parentNode.parentNode.insertBefore($alert, this.$submitBtn.parentNode);
          }
        } else {
          this.$form.parentNode.insertBefore($alert, this.$form);
        }
      }
    }
  }

  decodeHtml(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  removeFormAlert() {
    var $alert = this.$form.parentNode.querySelector('.fui-alert');

    if ($alert) {
      $alert.remove();
    }
  }

  removeBackInput() {
    // Remove the hidden back input sent in any previous step
    var $backButtonInput = this.$form.querySelector('[name="goToPageId"][type="hidden"]');

    if ($backButtonInput) {
      $backButtonInput.remove();
    } // Reset the chosen page


    this.$form.goToPage = null;
  }

  beforeSubmit() {
    // Remove all validation errors
    Array.prototype.filter.call(this.$form.querySelectorAll('input, select, textarea'), $field => {
      this.validator.removeError($field);
    });
    this.removeFormAlert();
    this.addLoading();
  }

  ajaxSubmit() {
    const formData = new FormData(this.$form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.settings.siteRootUrl);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Accept', 'application/json');
    this.beforeSubmit();

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);

          if (response.errors) {
            this.onAjaxError(response.errors, response.errorMessage);
          } else {
            this.onAjaxSuccess(response);
          }
        } catch (e) {
          this.onAjaxError(t('Unable to parse response `{e}`.', {
            e
          }));
        }
      } else {
        this.onAjaxError(xhr.status + ': ' + xhr.statusText);
      }
    };

    xhr.send(formData);
  }

  afterAjaxSubmit(response) {
    // This will be called regardless of success or error
    this.removeBackInput();
    this.updateSubmissionInput(response);
  }

  onAjaxError(response, errorMessage = '') {
    this.onFormError(errorMessage); // Fire a fail event

    this.submitHandler.formSubmitError();
    this.afterAjaxSubmit(response);

    if (typeof response === 'string') {
      this.showFormAlert(response, 'error');
    }

    if (typeof response === 'object') {
      Object.keys(response).forEach((handle, index) => {
        const [error] = response[handle];
        const $field = document.querySelector(`[name="fields[${handle}]"]`);

        if ($field) {
          this.validator.showError($field, {
            serverMessage: error
          }); // Focus on the first error

          if (index === 0) {
            $field.focus();
          }
        }
      });
    }
  }

  onAjaxSuccess(data) {
    // Fire the event, because we've overridden the handler
    this.submitHandler.formAfterSubmit(data);
    this.afterAjaxSubmit(data); // Reset the form hash, as all has been saved

    this.savedFormHash = this.hashForm(); // Check if we need to proceed to the next page

    if (data.nextPageId) {
      this.removeLoading();
      this.togglePage(data);
      return;
    } // If we're redirecting away, do it immediately for nicer UX


    if (this.settings.submitAction === 'entry' || this.settings.submitAction === 'url') {
      if (this.settings.submitActionTab === 'same-tab') {
        window.location.href = data.redirectUrl;
      } else if (this.settings.submitActionTab === 'new-tab') {
        window.open(data.redirectUrl, '_blank');
      }

      return;
    } // Delay this a little, in case we're redirecting away - better UX to just keep it loading


    this.removeLoading(); // Remove the back button - not great UX to go back to a finished form
    // Remember, its the button and the hidden input

    var $backButtonInputs = this.$form.querySelectorAll('[name="goToPageId"]');
    $backButtonInputs.forEach($backButtonInput => {
      $backButtonInput.remove();
    }); // Also remove the submit button for a multi-page form. Its bad UX to show you can
    // submit a multi-page form again, at the end. In fact, we'll probably get errors -
    // but this is totally fine for a single-page ajax form.

    if (data.totalPages > 1) {
      if (this.$submitBtn) {
        this.$submitBtn.remove();
      }
    }

    if (this.settings.submitAction === 'message') {
      this.showFormAlert(data.submitActionMessage, 'success'); // Check if we need to remove the success message

      this.hideSuccess();

      if (this.settings.submitActionFormHide) {
        this.$form.style.display = 'none';
      }
    } // Reset values regardless, for the moment


    this.$form.reset(); // Reset the form hash, as all has been saved

    this.savedFormHash = this.hashForm();
  }

  updateSubmissionInput(data) {
    if (!data.submissionId || !data.nextPageId) {
      return;
    } // Add the hidden submission input, if it doesn't exist


    var $input = this.$form.querySelector('[name="submissionId"][type="hidden"]');

    if (!$input) {
      $input = document.createElement('input');
      $input.setAttribute('type', 'hidden');
      $input.setAttribute('name', 'submissionId');
      this.$form.appendChild($input);
    }

    $input.setAttribute('value', data.submissionId);
  }

  togglePage(data) {
    // Hide all pages
    var $allPages = this.$form.querySelectorAll('.fui-page');
    $allPages.forEach($page => {
      // Show the current page
      if ($page.id === `${this.getPageId(data.nextPageId)}`) {
        $page.classList.remove('fui-hidden');
      } else {
        $page.classList.add('fui-hidden');
      }
    }); // Update tabs and progress bar if we're using them

    var $progress = this.$form.querySelector('.fui-progress-bar');

    if ($progress) {
      var pageIndex = data.nextPageIndex + 1;
      var progress = Math.round(pageIndex / data.totalPages * 100);
      $progress.style.width = progress + '%';
      $progress.setAttribute('aria-valuenow', progress);
      $progress.textContent = progress + '%';
    }

    var $tabs = this.$form.querySelectorAll('.fui-tab');
    $tabs.forEach($tab => {
      // Show the current page
      if ($tab.id === 'fui-tab-' + data.nextPageId) {
        $tab.classList.add('fui-tab-active');
      } else {
        $tab.classList.remove('fui-tab-active');
      }
    }); // Update the current page

    this.setCurrentPage(data.nextPageId); // Smooth-scroll to the top of the form.

    window.scrollTo({
      top: this.$form.getBoundingClientRect().top + window.pageYOffset - 50,
      behavior: 'smooth'
    });
  }

  setCurrentPage(pageId) {
    this.currentPageId = `#${this.getPageId(pageId)}`;
    this.$currentPage = document.querySelector(this.currentPageId);
  }

  getPageId(pageId) {
    return `${this.config.formHashId}-p-${pageId}`;
  }

}

/***/ }),

/***/ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-lib.js":
/*!******************************************************************************!*\
  !*** ./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-lib.js ***!
  \******************************************************************************/
/*! exports provided: Formie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formie", function() { return Formie; });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/utils.js");
/* harmony import */ var _formie_form_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formie-form-base */ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-form-base.js");
const globals = __webpack_require__(/*! ./utils/globals */ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/globals.js");



class Formie {
  constructor() {
    this.forms = [];
  }

  initForms() {
    // TODO: Change this to not be an ID for greater flexibility at the next breakpoint
    this.$forms = document.querySelectorAll('form[id^="formie-form-"]') || []; // We use this in the CP, where it's a bit tricky to add a form ID. So check just in case.
    // Might also be handy for front-end too!

    if (!this.$forms.length) {
      this.$forms = document.querySelectorAll('div[id^="formie-form-"]') || [];
    }

    this.$forms.forEach($form => {
      this.initForm($form);
    }); // Emit a custom event to let scripts know the Formie class is ready

    document.dispatchEvent(new CustomEvent('onFormieInit', {
      bubbles: true,
      detail: {
        formie: this
      }
    }));
  }

  initForm($form) {
    // Initialize the form class with the `data-config` param on the form
    var formConfig = JSON.parse($form.getAttribute('data-config'));

    if (!formConfig) {
      console.error('Unable to parse `data-config` form attribute for config. Ensure this attribute exists on your form and contains valid JSON.');
      return;
    } // See if we need to init additional, conditional JS (field, captchas, etc)


    var registeredJs = formConfig.registeredJs || []; // Add an instance to this factory to the form config

    formConfig.Formie = this; // Create the form class, save it to our collection

    var form = new _formie_form_base__WEBPACK_IMPORTED_MODULE_1__["FormieFormBase"](formConfig);
    this.forms.push(form); // Find all `data-field-config` attributes for the current page and form
    // and build an object of them to initialize when loaded.

    this.fieldConfigs = this.parseFieldConfig($form, $form); // Is there any additional JS config registered for this form?

    if (registeredJs.length) {
      // Create a container to add these items to, so we can destroy them later
      form.$registeredJs = document.createElement('div');
      form.$registeredJs.setAttribute('data-fui-scripts', formConfig.formId);
      document.body.appendChild(form.$registeredJs); // Create a `<script>` for each registered JS

      registeredJs.forEach(config => {
        var $script = document.createElement('script'); // Check if we've provided an external script to load. Ensure they're deferred so they don't block
        // and use the onload call to trigger any actual scripts once its been loaded.

        if (config.src) {
          $script.src = config.src;
          $script.defer = true; // Initialize all matching fields - their config is already rendered in templates

          $script.onload = () => {
            // Mostly for captchas, but might change this...
            if (config.onload) {
              eval(config.onload);
            }

            if (config.module) {
              var fieldConfigs = this.fieldConfigs[config.module];

              if (fieldConfigs && fieldConfigs.length) {
                fieldConfigs.forEach(fieldConfig => {
                  // Yes, I'm aware of `eval()` but its pretty safe as it's
                  // only provided from the field or captcha class - no user data.
                  eval(`new ${config.module}(fieldConfig)`);
                });
              }
            }
          };
        }

        form.$registeredJs.appendChild($script);
      });
    }
  }

  parseFieldConfig($element, $form) {
    var config = {};
    $element.querySelectorAll('[data-field-config]').forEach($field => {
      var fieldConfig = JSON.parse($field.getAttribute('data-field-config')); // Some fields supply multiple modules, so normalise for ease-of-processing

      if (!Array.isArray(fieldConfig)) {
        fieldConfig = [fieldConfig];
      }

      fieldConfig.forEach(nestedFieldConfig => {
        if (!config[nestedFieldConfig.module]) {
          config[nestedFieldConfig.module] = [];
        } // Provide field classes with the data they need


        config[nestedFieldConfig.module].push({
          $form,
          $field,
          ...nestedFieldConfig
        });
      });
    });
    return config;
  }

  getForm($form) {
    return this.forms.find(form => {
      return form.$form == $form;
    });
  }

  getFormById(id) {
    return this.forms.find(form => {
      if (form.config) {
        return form.config.formId == id;
      }
    });
  }

  getFormByHandle(handle) {
    return this.forms.find(form => {
      if (form.config) {
        return form.config.formHandle == handle;
      }
    });
  }

  destroyForm($form) {
    var form = this.getForm($form);

    if (!form) {
      return;
    }

    var index = this.forms.indexOf(form);

    if (index === -1) {
      return;
    } // Delete any additional scripts for the form - if any


    if (form.$registeredJs && form.$registeredJs.parentNode) {
      form.$registeredJs.parentNode.removeChild(form.$registeredJs);
    } // Remove all event listeners attached to this form


    if (!Object(_utils_utils__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(form.listeners)) {
      Object.keys(form.listeners).forEach(eventKey => {
        form.removeEventListener(eventKey);
      });
    } // Destroy Bouncer events


    if (form.formTheme && form.formTheme.validator) {
      form.formTheme.validator.destroy();
    } // Delete it from the factory


    delete this.forms[index];
  }

}
window.Formie = Formie;

/***/ }),

/***/ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/bouncer.js":
/*!*********************************************************************************!*\
  !*** ./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/bouncer.js ***!
  \*********************************************************************************/
/*! exports provided: Bouncer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bouncer", function() { return Bouncer; });
/* eslint-disable */

/*!
 * formbouncerjs v1.4.6
 * A lightweight form validation script that augments native HTML5 form validation elements and attributes.
 * (c) 2020 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/bouncer
 */

/**
 * The plugin constructor
 * @param {String} selector The selector to use for forms to be validated
 * @param {Object} options  User settings [optional]
 */
const Bouncer = function (selector, options) {
  //
  // Variables
  //
  var defaults = {
    // Classes & IDs
    fieldClass: 'error',
    errorClass: 'error-message',
    fieldPrefix: 'bouncer-field_',
    errorPrefix: 'bouncer-error_',
    // Patterns
    patterns: {
      email: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
      url: /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/,
      number: /^(?:[-+]?[0-9]*[.,]?[0-9]+)$/,
      color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
      date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,
      time: /^(?:(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]))$/,
      month: /^(?:(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])))$/
    },
    // Custom Validations
    customValidations: {},
    // Messages
    messageAfterField: true,
    messageCustom: 'data-bouncer-message',
    messageTarget: 'data-bouncer-target',
    // messages: {
    //     missingValue: {
    //         checkbox: 'This field is required.',
    //         radio: 'Please select a value.',
    //         select: 'Please select a value.',
    //         'select-multiple': 'Please select at least one value.',
    //         default: 'Please fill out this field.',
    //     },
    //     patternMismatch: {
    //         email: 'Please enter a valid email address.',
    //         url: 'Please enter a URL.',
    //         number: 'Please enter a number',
    //         color: 'Please match the following format: #rrggbb',
    //         date: 'Please use the YYYY-MM-DD format',
    //         time: 'Please use the 24-hour time format. Ex. 23:00',
    //         month: 'Please use the YYYY-MM format',
    //         default: 'Please match the requested format.',
    //     },
    //     outOfRange: {
    //         over: 'Please select a value that is no more than {max}.',
    //         under: 'Please select a value that is no less than {min}.',
    //     },
    //     wrongLength: {
    //         over: 'Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.',
    //         under: 'Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.',
    //     },
    //     fallback: 'There was an error with this field.',
    // },
    // Form Submission
    disableSubmit: false,
    // Allow blur/click/input events to be opt-out
    validateOnBlur: true,
    // Allow validation to be turned off altogether. Useful for server-side validation use.
    validateOnSubmit: true,
    // Custom Events
    emitEvents: true
  }; //
  // Methods
  //

  /**
   * A wrapper for Array.prototype.forEach() for non-arrays
   * @param  {Array-like} arr      The array-like object
   * @param  {Function}   callback The callback to run
   */

  var forEach = function (arr, callback) {
    Array.prototype.forEach.call(arr, callback);
  };
  /**
   * Merge two or more objects together.
   * @param   {Object}   objects  The objects to merge together
   * @returns {Object}            Merged values of defaults and options
   */


  var extend = function () {
    var merged = {};
    forEach(arguments, obj => {
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) return;

        if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
          merged[key] = extend(merged[key], obj[key]);
        } else {
          merged[key] = obj[key];
        } // merged[key] = obj[key];

      }
    });
    return merged;
  };
  /**
   * Emit a custom event
   * @param  {String} type    The event type
   * @param  {Object} options The settings object
   * @param  {Node}   anchor  The anchor element
   * @param  {Node}   toggle  The toggle element
   */


  var emitEvent = function (elem, type, details) {
    if (typeof window.CustomEvent !== 'function') return;
    var event = new CustomEvent(type, {
      bubbles: true,
      detail: details || {}
    });
    elem.dispatchEvent(event);
  };
  /**
   * Add the `novalidate` attribute to all forms
   * @param {Boolean} remove  If true, remove the `novalidate` attribute
   */


  var addNoValidate = function (selector) {
    forEach(document.querySelectorAll(selector), form => {
      form.setAttribute('novalidate', true);
    });
  };
  /**
   * Remove the `novalidate` attribute to all forms
   */


  var removeNoValidate = function (selector) {
    forEach(document.querySelectorAll(selector), form => {
      form.removeAttribute('novalidate');
    });
  };
  /**
   * Check if a required field is missing its value
   * @param  {Node} field The field to check
   * @return {Boolean}       It true, field is missing it's value
   */


  var missingValue = function (field) {
    // If not required, bail
    if (!field.hasAttribute('required')) return false; // Handle checkboxes

    if (field.type === 'checkbox') {
      var checkboxInputs = field.form.querySelectorAll('[name="' + escapeCharacters(field.name) + '"]:not([type="hidden"])');
      var checkedInputs = Array.prototype.filter.call(checkboxInputs, btn => {
        return btn.checked;
      }).length;

      if (checkedInputs === 0) {
        return field === checkboxInputs[0];
      }

      return !field.checked;
    } // Get the field value length


    var {
      length
    } = field.value; // Handle radio buttons

    if (field.type === 'radio') {
      length = Array.prototype.filter.call(field.form.querySelectorAll('[name="' + escapeCharacters(field.name) + '"]'), btn => {
        return btn.checked;
      }).length;
    } // Check for value


    return length < 1;
  };
  /**
   * Check if field value doesn't match a patter.
   * @param  {Node}   field    The field to check
   * @param  {Object} settings The plugin settings
   * @see https://www.w3.org/TR/html51/sec-forms.html#the-pattern-attribute
   * @return {Boolean}         If true, there's a pattern mismatch
   */


  var patternMismatch = function (field, settings) {
    // Check if there's a pattern to match
    var pattern = field.getAttribute('pattern');
    pattern = pattern ? new RegExp('^(?:' + pattern + ')$') : settings.patterns[field.type];
    if (!pattern || !field.value || field.value.length < 1) return false; // Validate the pattern

    return field.value.match(pattern) ? false : true;
  };
  /**
   * Check if field value is out-of-range
   * @param  {Node}    field    The field to check
   * @return {String}           Returns 'over', 'under', or false
   */


  var outOfRange = function (field) {
    // Make sure field has value
    if (!field.value || field.value.length < 1) return false; // Check for range

    var max = field.getAttribute('max');
    var min = field.getAttribute('min'); // Check validity

    var num = parseFloat(field.value);
    if (max && num > max) return 'over';
    if (min && num < min) return 'under';
    return false;
  };
  /**
   * Check if the field value is too long or too short
   * @param  {Node}   field    The field to check
   * @return {String}           Returns 'over', 'under', or false
   */


  var wrongLength = function (field) {
    // Make sure field has value
    if (!field.value || field.value.length < 1) return false; // Check for min/max length

    var max = field.getAttribute('maxlength');
    var min = field.getAttribute('minlength'); // Check validity

    var {
      length
    } = field.value;
    if (max && length > max) return 'over';
    if (min && length < min) return 'under';
    return false;
  };
  /**
   * Test for standard field validations
   * @param  {Node}   field    The field to test
   * @param  {Object} settings The plugin settings
   * @return {Object}          The tests and their results
   */


  var runValidations = function (field, settings) {
    return {
      missingValue: missingValue(field),
      patternMismatch: patternMismatch(field, settings),
      outOfRange: outOfRange(field),
      wrongLength: wrongLength(field)
    };
  };
  /**
   * Run any provided custom validations
   * @param  {Node}   field       The field to test
   * @param  {Object} errors      The existing errors
   * @param  {Object} validations The custom validations to run
   * @param  {Object} settings    The plugin settings
   * @return {Object}             The tests and their results
   */


  var customValidations = function (field, errors, validations, settings) {
    for (var test in validations) {
      if (validations.hasOwnProperty(test)) {
        errors[test] = validations[test](field, settings);
      }
    }

    return errors;
  };
  /**
   * Check if a field has any errors
   * @param  {Object}  errors The validation test results
   * @return {Boolean}        Returns true if there are errors
   */


  var hasErrors = function (errors) {
    for (var type in errors) {
      if (errors[type]) return true;
    }

    return false;
  };
  /**
   * Check a field for errors
   * @param  {Node} field      The field to test
   * @param  {Object} settings The plugin settings
   * @return {Object}          The field validity and errors
   */


  var getErrors = function (field, settings) {
    // Get standard validation errors
    var errors = runValidations(field, settings); // Check for custom validations

    errors = customValidations(field, errors, settings.customValidations, settings);
    return {
      valid: !hasErrors(errors),
      errors
    };
  };
  /**
   * Escape special characters for use with querySelector
   * @author Mathias Bynens
   * @link https://github.com/mathiasbynens/CSS.escape
   * @param {String} id The anchor ID to escape
   */


  var escapeCharacters = function (id) {
    var string = String(id);
    var {
      length
    } = string;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);

    while (++index < length) {
      codeUnit = string.charCodeAt(index); // Note: there’s no need to special-case astral symbols, surrogate
      // pairs, or lone surrogates.
      // If the character is NULL (U+0000), then throw an
      // `InvalidCharacterError` exception and terminate these steps.

      if (codeUnit === 0x0000) {
        throw new InvalidCharacterError('Invalid character: the input contains U+0000.');
      }

      if ( // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F || // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 || // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002D) {
        // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      } // If the character is not handled by one of the above rules and is
      // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
      // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
      // U+005A), or [a-z] (U+0061 to U+007A), […]


      if (codeUnit >= 0x0080 || codeUnit === 0x002D || codeUnit === 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
        // the character itself
        result += string.charAt(index);
        continue;
      } // Otherwise, the escaped character.
      // http://dev.w3.org/csswg/cssom/#escape-a-character


      result += '\\' + string.charAt(index);
    } // Return sanitized hash


    return result;
  };
  /**
   * Get or create an ID for a field
   * @param  {Node}    field    The field
   * @param  {Object}  settings The plugin settings
   * @param  {Boolean} create   If true, create an ID if there isn't one
   * @return {String}           The field ID
   */


  var getFieldID = function (field, settings, create) {
    var id = field.name ? field.name : field.id;

    if (!id && create) {
      id = settings.fieldPrefix + Math.floor(Math.random() * 999);
      field.id = id;
    }

    if (field.type === 'checkbox') {
      id += '_' + (field.value || field.id);
    }

    return id;
  };
  /**
   * Special handling for radio buttons and checkboxes wrapped in labels.
   * @param  {Node} field The field with the error
   * @return {Node}       The field to show the error on
   */


  var getErrorField = function (field) {
    // If the field is a radio button, get the last item in the radio group
    // @todo if location is before, get first item
    if (field.type === 'radio' && field.name) {
      var group = field.form.querySelectorAll('[name="' + escapeCharacters(field.name) + '"]');
      field = group[group.length - 1];
    } // Get the associated label for radio button or checkbox
    // if (field.type === 'radio') {
    //     var label = field.closest('label') || field.form.querySelector('[for="' + field.id + '"]');
    //     field = label || field;
    // }


    if (field.type === 'checkbox' || field.type === 'radio') {
      // TODO: think of a way to make this less opinionated
      field = field.closest('.fui-field-container');
    }

    return field;
  };
  /**
   * Get the location for a field's error message
   * @param  {Node}   field    The field
   * @param  {Node}   target   The target for error message
   * @param  {Object} settings The plugin settings
   * @return {Node}            The error location
   */


  var getErrorLocation = function (field, target, settings) {
    // Check for a custom error message
    var selector = field.getAttribute(settings.messageTarget);

    if (selector) {
      var location = field.form.querySelector(selector);

      if (location) {
        // @bugfix by @HaroldPutman
        // https://github.com/cferdinandi/bouncer/pull/28
        return location.firstChild || location.appendChild(document.createTextNode(''));
      }
    } // If the message should come after the field


    if (settings.messageAfterField) {
      // If there's no next sibling, create one
      if (!target.nextSibling) {
        target.parentNode.appendChild(document.createTextNode(''));
      }

      return target.nextSibling;
    } // If it should come before


    return target;
  };
  /**
   * Create a validation error message node
   * @param  {Node} field      The field
   * @param  {Object} settings The plugin settings
   * @return {Node}            The error message node
   */


  var createError = function (field, settings) {
    // Create the error message
    var error = document.createElement('div');
    error.className = settings.errorClass;
    error.id = settings.errorPrefix + getFieldID(field, settings, true); // If the field is a radio button or checkbox, grab the last field label

    var fieldTarget = getErrorField(field); // Inject the error message into the DOM

    var location = getErrorLocation(field, fieldTarget, settings);
    location.parentNode.insertBefore(error, location);
    return error;
  };
  /**
   * Get the error message test
   * @param  {Node}            field    The field to get an error message for
   * @param  {Object}          errors   The errors on the field
   * @param  {Object}          settings The plugin settings
   * @return {String|Function}          The error message
   */


  var getErrorMessage = function (field, errors, settings) {
    // Variables
    var {
      messages
    } = settings; // Missing value error

    if (errors.missingValue) {
      return messages.missingValue[field.type] || messages.missingValue.default;
    } // Numbers that are out of range


    if (errors.outOfRange) {
      return messages.outOfRange[errors.outOfRange].replace('{max}', field.getAttribute('max')).replace('{min}', field.getAttribute('min')).replace('{length}', field.value.length);
    } // Values that are too long or short


    if (errors.wrongLength) {
      return messages.wrongLength[errors.wrongLength].replace('{maxLength}', field.getAttribute('maxlength')).replace('{minLength}', field.getAttribute('minlength')).replace('{length}', field.value.length);
    } // Pattern mismatch error


    if (errors.patternMismatch) {
      var custom = field.getAttribute(settings.messageCustom);
      if (custom) return custom;
      return messages.patternMismatch[field.type] || messages.patternMismatch.default;
    } // Custom validations


    for (var test in settings.customValidations) {
      if (settings.customValidations.hasOwnProperty(test)) {
        if (errors[test] && messages[test]) return messages[test];
      }
    } // Custom message, passed directly in


    if (errors.customMessage) {
      return errors.customMessage;
    } // Fallback error message


    return messages.fallback;
  };
  /**
   * Add error attributes to a field
   * @param  {Node}   field    The field with the error message
   * @param  {Node}   error    The error message
   * @param  {Object} settings The plugin settings
   */


  var addErrorAttributes = function (field, error, settings) {
    field.classList.add(settings.fieldClass);
    field.setAttribute('aria-describedby', error.id);
    field.setAttribute('aria-invalid', true); // TODO: think of a way to make this less opinionated

    var $fieldNode = field.closest('.fui-field');

    if ($fieldNode) {
      $fieldNode.classList.add(settings.fieldClass);
    }
  };
  /**
   * Show error attributes on a field or radio/checkbox group
   * @param  {Node}   field    The field with the error message
   * @param  {Node}   error    The error message
   * @param  {Object} settings The plugin settings
   */


  var showErrorAttributes = function (field, error, settings) {
    // If field is a radio button, add attributes to every button in the group
    if (field.type === 'radio' && field.name) {
      Array.prototype.forEach.call(document.querySelectorAll('[name="' + field.name + '"]'), button => {
        addErrorAttributes(button, error, settings);
      });
    } // Otherwise, add an error class and aria attribute to the field


    addErrorAttributes(field, error, settings);
  };
  /**
   * Show an error message in the DOM
   * @param  {Node} field      The field to show an error message for
   * @param  {Object}          errors   The errors on the field
   * @param  {Object}          settings The plugin settings
   */


  var showError = function (field, errors, settings) {
    // Get/create an error message
    var error = field.form.querySelector('#' + escapeCharacters(settings.errorPrefix + getFieldID(field, settings))) || createError(field, settings);
    var msg = getErrorMessage(field, errors, settings);
    error.textContent = typeof msg === 'function' ? msg(field, settings) : msg; // Add error attributes

    showErrorAttributes(field, error, settings); // Emit custom event

    if (settings.emitEvents) {
      emitEvent(field, 'bouncerShowError', {
        errors
      });
    }
  };
  /**
   * Remove error attributes from a field
   * @param  {Node}   field    The field with the error message
   * @param  {Node}   error    The error message
   * @param  {Object} settings The plugin settings
   */


  var removeAttributes = function (field, settings) {
    field.classList.remove(settings.fieldClass);
    field.removeAttribute('aria-describedby');
    field.removeAttribute('aria-invalid'); // TODO: think of a way to make this less opinionated

    var $fieldNode = field.closest('.fui-field');

    if ($fieldNode) {
      $fieldNode.classList.remove(settings.fieldClass);
    }
  };
  /**
   * Remove error attributes from the field or radio group
   * @param  {Node}   field    The field with the error message
   * @param  {Node}   error    The error message
   * @param  {Object} settings The plugin settings
   */


  var removeErrorAttributes = function (field, settings) {
    // If field is a radio button, remove attributes from every button in the group
    if (field.type === 'radio' && field.name) {
      Array.prototype.forEach.call(document.querySelectorAll('[name="' + field.name + '"]'), button => {
        removeAttributes(button, settings);
      });
      return;
    } // Otherwise, add an error class and aria attribute to the field


    removeAttributes(field, settings);
  };
  /**
   * Remove an error message from the DOM
   * @param  {Node} field      The field with the error message
   * @param  {Object} settings The plugin settings
   */


  var removeError = function (field, settings) {
    // Get the error message for this field
    var error = field.form.querySelector('#' + escapeCharacters(settings.errorPrefix + getFieldID(field, settings)));
    if (!error) return; // Remove the error

    error.parentNode.removeChild(error); // Remove error and a11y from the field

    removeErrorAttributes(field, settings); // Emit custom event

    if (settings.emitEvents) {
      emitEvent(field, 'bouncerRemoveError');
    }
  };
  /**
   * Remove errors from all fields
   * @param  {String} selector The selector for the form
   * @param  {Object} settings The plugin settings
   */


  var removeAllErrors = function (selector, settings) {
    forEach(document.querySelectorAll(selector), form => {
      forEach(form.querySelectorAll('input, select, textarea'), field => {
        removeError(field, settings);
      });
    });
  }; //
  // Variables
  //


  var publicAPIs = {};
  var settings; //
  // Methods
  //

  /**
   * Show an error message in the DOM
   * @param  {Node} field      The field to show an error message for
   * @param  {Object}          errors   The errors on the field
   * @param  {Object}          options Additional plugin settings
   */

  publicAPIs.showError = function (field, errors, options) {
    var _settings = extend(settings, options || {});

    return showError(field, errors, _settings);
  };
  /**
   * Remove an error message from the DOM
   * @param  {Node} field      The field with the error message
   * @param  {Object} settings The plugin settings
   */


  publicAPIs.removeError = function (field, options) {
    var _settings = extend(settings, options || {});

    return removeError(field, _settings);
  };
  /**
   * Validate a field
   * @param  {Node} field     The field to validate
   * @param  {Object} options Validation options
   * @return {Object}         The validity state and errors
   */


  publicAPIs.validate = function (field, options) {
    // Don't validate submits, buttons, file and reset inputs, and disabled and readonly fields
    if (field.disabled || field.readOnly || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return; // Local settings

    var _settings = extend(settings, options || {}); // Check for errors


    var isValid = getErrors(field, _settings); // If valid, remove any error messages

    if (isValid.valid) {
      removeError(field, _settings);
      return;
    } // Otherwise, show an error message


    showError(field, isValid.errors, _settings);
    return isValid;
  };
  /**
   * Validate all fields in a form or section
   * @param  {Node} target The form or section to validate fields in
   * @return {Array}       An array of fields with errors
   */


  publicAPIs.validateAll = function (target) {
    return Array.prototype.filter.call(target.querySelectorAll('input, select, textarea'), field => {
      var validate = publicAPIs.validate(field);
      return validate && !validate.valid;
    });
  };
  /**
   * Run a validation on field blur
   */


  var blurHandler = function (event) {
    // Only run if the field is in a form to be validated
    if (!event.target.form || !event.target.form.matches(selector)) return; // Special-case for file field, blurs as soon as the selector kicks in

    if (event.target.type === 'file') return; // Validate the field

    publicAPIs.validate(event.target);
  }; // Leave this as opt-in for the moment, for better file-support


  var changeHandler = function (event) {
    // Only run if the field is in a form to be validated
    if (!event.target.form || !event.target.form.matches(selector)) return; // Just deal with file input fields

    if (event.target.type !== 'file') return; // Validate the field

    publicAPIs.validate(event.target);
  };
  /**
   * Run a validation on a fields with errors when the value changes
   */


  var inputHandler = function (event) {
    // Only run if the field is in a form to be validated
    if (!event.target.form || !event.target.form.matches(selector)) return; // Only run on fields with errors

    if (!event.target.classList.contains(settings.fieldClass)) return; // Validate the field

    publicAPIs.validate(event.target);
  };
  /**
   * Validate an entire form when it's submitted
   */


  var submitHandler = function (event) {
    // Only run on matching elements
    if (!event.target.matches(selector)) return; // Prevent form submission

    event.preventDefault(); // Validate each field

    var errors = publicAPIs.validateAll(event.target); // If there are errors, focus on the first one

    if (errors.length > 0) {
      errors[0].focus();
      emitEvent(event.target, 'bouncerFormInvalid', {
        errors
      });
      return;
    } // Otherwise, submit if not disabled


    if (!settings.disableSubmit) {
      event.target.submit();
    } // Emit custom event


    if (settings.emitEvents) {
      emitEvent(event.target, 'bouncerFormValid');
    }
  };
  /**
   * Destroy the current plugin instantiation
   */


  publicAPIs.destroy = function () {
    // Remove event listeners
    if (settings.validateOnBlur) {
      document.removeEventListener('blur', blurHandler, true);
      document.removeEventListener('input', inputHandler, false);
      document.removeEventListener('change', changeHandler, false);
      document.removeEventListener('click', inputHandler, false);
    }

    if (settings.validateOnSubmit) {
      document.removeEventListener('submit', submitHandler, false);
    } // Remove all errors


    removeAllErrors(selector, settings); // Remove novalidate attribute

    removeNoValidate(selector); // Emit custom event

    if (settings.emitEvents) {
      emitEvent(document, 'bouncerDestroyed', {
        settings
      });
    } // Reset settings


    settings = null;
  };
  /**
   * Instantiate a new instance of the plugin
   */


  var init = function () {
    // Create settings
    settings = extend(defaults, options || {}); // Add novalidate attribute

    addNoValidate(selector); // Event Listeners

    if (settings.validateOnBlur) {
      document.addEventListener('blur', blurHandler, true);
      document.addEventListener('input', inputHandler, false);
      document.addEventListener('change', changeHandler, false);
      document.addEventListener('click', inputHandler, false);
    }

    if (settings.validateOnSubmit) {
      document.addEventListener('submit', submitHandler, false);
    } // Emit custom event


    if (settings.emitEvents) {
      emitEvent(document, 'bouncerInitialized', {
        settings
      });
    }
  }; //
  // Inits & Event Listeners
  //


  init();
  return publicAPIs;
};

/***/ }),

/***/ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/globals.js":
/*!*********************************************************************************!*\
  !*** ./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/globals.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var formdata_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! formdata-polyfill */ "./node_modules/formdata-polyfill/formdata.min.js");
/* harmony import */ var formdata_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(formdata_polyfill__WEBPACK_IMPORTED_MODULE_0__);
global.t = function (string, replacements = {}) {
  if (window.FormieTranslations) {
    string = window.FormieTranslations[string] || string;
  }

  return string.replace(/{([a-zA-Z0-9]+)}/g, (match, p1) => {
    if (replacements[p1]) {
      return replacements[p1];
    }

    return match;
  });
}; //
// Polyfills for IE11
//
// CustomEvent()


(function () {
  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  window.CustomEvent = CustomEvent;
})(); // FormData


 // closest

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/utils.js":
/*!*******************************************************************************!*\
  !*** ./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/utils/utils.js ***!
  \*******************************************************************************/
/*! exports provided: isEmpty, toBoolean, eventKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBoolean", function() { return toBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventKey", function() { return eventKey; });
const isEmpty = function (obj) {
  return Object.keys(obj).length === 0;
};
const toBoolean = function (val) {
  return !/^(?:f(?:alse)?|no?|0+)$/i.test(val) && !!val;
};
const eventKey = function (eventName) {
  return eventName + '.' + Math.random();
};

/***/ }),

/***/ "./node_modules/formdata-polyfill/formdata.min.js":
/*!********************************************************!*\
  !*** ./node_modules/formdata-polyfill/formdata.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {;(function(){var h;function l(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}}var m="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};
function n(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");}var p=n(this);function r(a,c){if(c){for(var b=p,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];f in b||(b[f]={});b=b[f]}d=d[d.length-1];e=b[d];f=c(e);f!=e&&null!=f&&m(b,d,{configurable:!0,writable:!0,value:f})}}
r("Symbol",function(a){function c(e){if(this instanceof c)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(e||"")+"_"+d++,e)}function b(e,f){this.o=e;m(this,"description",{configurable:!0,writable:!0,value:f})}if(a)return a;b.prototype.toString=function(){return this.o};var d=0;return c});
r("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var c="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),b=0;b<c.length;b++){var d=p[c[b]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&m(d.prototype,a,{configurable:!0,writable:!0,value:function(){return u(l(this))}})}return a});function u(a){a={next:a};a[Symbol.iterator]=function(){return this};return a}
function v(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):{next:l(a)}}var w;if("function"==typeof Object.setPrototypeOf)w=Object.setPrototypeOf;else{var y;a:{var z={u:!0},A={};try{A.__proto__=z;y=A.u;break a}catch(a){}y=!1}w=y?function(a,c){a.__proto__=c;if(a.__proto__!==c)throw new TypeError(a+" is not extensible");return a}:null}var B=w;function C(){this.h=!1;this.f=null;this.m=void 0;this.b=1;this.l=this.v=0;this.g=null}
function D(a){if(a.h)throw new TypeError("Generator is already running");a.h=!0}C.prototype.i=function(a){this.m=a};C.prototype.j=function(a){this.g={w:a,A:!0};this.b=this.v||this.l};C.prototype["return"]=function(a){this.g={"return":a};this.b=this.l};function E(a,c){a.b=3;return{value:c}}function F(a){this.a=new C;this.B=a}F.prototype.i=function(a){D(this.a);if(this.a.f)return G(this,this.a.f.next,a,this.a.i);this.a.i(a);return H(this)};
function I(a,c){D(a.a);var b=a.a.f;if(b)return G(a,"return"in b?b["return"]:function(d){return{value:d,done:!0}},c,a.a["return"]);a.a["return"](c);return H(a)}F.prototype.j=function(a){D(this.a);if(this.a.f)return G(this,this.a.f["throw"],a,this.a.i);this.a.j(a);return H(this)};
function G(a,c,b,d){try{var e=c.call(a.a.f,b);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.a.h=!1,e;var f=e.value}catch(g){return a.a.f=null,a.a.j(g),H(a)}a.a.f=null;d.call(a.a,f);return H(a)}function H(a){for(;a.a.b;)try{var c=a.B(a.a);if(c)return a.a.h=!1,{value:c.value,done:!1}}catch(b){a.a.m=void 0,a.a.j(b)}a.a.h=!1;if(a.a.g){c=a.a.g;a.a.g=null;if(c.A)throw c.w;return{value:c["return"],done:!0}}return{value:void 0,done:!0}}
function J(a){this.next=function(c){return a.i(c)};this["throw"]=function(c){return a.j(c)};this["return"]=function(c){return I(a,c)};this[Symbol.iterator]=function(){return this}}function K(a,c){var b=new J(new F(c));B&&B(b,a.prototype);return b}
if("undefined"!==typeof Blob&&("undefined"===typeof FormData||!FormData.prototype.keys)){var L=function(a,c){for(var b=0;b<a.length;b++)c(a[b])},M=function(a,c,b){return c instanceof Blob?[String(a),c,void 0!==b?b+"":"string"===typeof c.name?c.name:"blob"]:[String(a),String(c)]},N=function(a,c){if(a.length<c)throw new TypeError(c+" argument required, but only "+a.length+" present.");},O=function(a){var c=v(a);a=c.next().value;var b=c.next().value;c=c.next().value;b instanceof Blob&&(b=new File([b],
c,{type:b.type,lastModified:b.lastModified}));return[a,b]},P="object"===typeof globalThis?globalThis:"object"===typeof window?window:"object"===typeof self?self:this,Q=P.FormData,R=P.XMLHttpRequest&&P.XMLHttpRequest.prototype.send,S=P.Request&&P.fetch,T=P.navigator&&P.navigator.sendBeacon,U=P.Element&&P.Element.prototype,V=P.Symbol&&Symbol.toStringTag;V&&(Blob.prototype[V]||(Blob.prototype[V]="Blob"),"File"in P&&!File.prototype[V]&&(File.prototype[V]="File"));try{new File([],"")}catch(a){P.File=function(c,
b,d){c=new Blob(c,d);d=d&&void 0!==d.lastModified?new Date(d.lastModified):new Date;Object.defineProperties(c,{name:{value:b},lastModifiedDate:{value:d},lastModified:{value:+d},toString:{value:function(){return"[object File]"}}});V&&Object.defineProperty(c,V,{value:"File"});return c}}var W=function(a){this.c=[];var c=this;a&&L(a.elements,function(b){if(b.name&&!b.disabled&&"submit"!==b.type&&"button"!==b.type&&!b.matches("form fieldset[disabled] *"))if("file"===b.type){var d=b.files&&b.files.length?
b.files:[new File([],"",{type:"application/octet-stream"})];L(d,function(e){c.append(b.name,e)})}else"select-multiple"===b.type||"select-one"===b.type?L(b.options,function(e){!e.disabled&&e.selected&&c.append(b.name,e.value)}):"checkbox"===b.type||"radio"===b.type?b.checked&&c.append(b.name,b.value):(d="textarea"===b.type?b.value.replace(/\r\n/g,"\n").replace(/\n/g,"\r\n"):b.value,c.append(b.name,d))})};h=W.prototype;h.append=function(a,c,b){N(arguments,2);this.c.push(M(a,c,b))};h["delete"]=function(a){N(arguments,
1);var c=[];a=String(a);L(this.c,function(b){b[0]!==a&&c.push(b)});this.c=c};h.entries=function c(){var b,d=this;return K(c,function(e){1==e.b&&(b=0);if(3!=e.b)return b<d.c.length?e=E(e,O(d.c[b])):(e.b=0,e=void 0),e;b++;e.b=2})};h.forEach=function(c,b){N(arguments,1);for(var d=v(this),e=d.next();!e.done;e=d.next()){var f=v(e.value);e=f.next().value;f=f.next().value;c.call(b,f,e,this)}};h.get=function(c){N(arguments,1);var b=this.c;c=String(c);for(var d=0;d<b.length;d++)if(b[d][0]===c)return O(b[d])[1];
return null};h.getAll=function(c){N(arguments,1);var b=[];c=String(c);L(this.c,function(d){d[0]===c&&b.push(O(d)[1])});return b};h.has=function(c){N(arguments,1);c=String(c);for(var b=0;b<this.c.length;b++)if(this.c[b][0]===c)return!0;return!1};h.keys=function b(){var d=this,e,f,g,k,q;return K(b,function(t){1==t.b&&(e=v(d),f=e.next());if(3!=t.b){if(f.done){t.b=0;return}g=f.value;k=v(g);q=k.next().value;return E(t,q)}f=e.next();t.b=2})};h.set=function(b,d,e){N(arguments,2);b=String(b);var f=[],g=M(b,
d,e),k=!0;L(this.c,function(q){q[0]===b?k&&(k=!f.push(g)):f.push(q)});k&&f.push(g);this.c=f};h.values=function d(){var e=this,f,g,k,q,t;return K(d,function(x){1==x.b&&(f=v(e),g=f.next());if(3!=x.b){if(g.done){x.b=0;return}k=g.value;q=v(k);q.next();t=q.next().value;return E(x,t)}g=f.next();x.b=2})};W.prototype._asNative=function(){for(var d=new Q,e=v(this),f=e.next();!f.done;f=e.next()){var g=v(f.value);f=g.next().value;g=g.next().value;d.append(f,g)}return d};W.prototype._blob=function(){for(var d=
"----formdata-polyfill-"+Math.random(),e=[],f=v(this),g=f.next();!g.done;g=f.next()){var k=v(g.value);g=k.next().value;k=k.next().value;e.push("--"+d+"\r\n");k instanceof Blob?e.push('Content-Disposition: form-data; name="'+g+'"; filename="'+k.name+'"\r\nContent-Type: '+((k.type||"application/octet-stream")+"\r\n\r\n"),k,"\r\n"):e.push('Content-Disposition: form-data; name="'+g+'"\r\n\r\n'+k+"\r\n")}e.push("--"+d+"--");return new Blob(e,{type:"multipart/form-data; boundary="+d})};W.prototype[Symbol.iterator]=
function(){return this.entries()};W.prototype.toString=function(){return"[object FormData]"};U&&!U.matches&&(U.matches=U.matchesSelector||U.mozMatchesSelector||U.msMatchesSelector||U.oMatchesSelector||U.webkitMatchesSelector||function(d){d=(this.document||this.ownerDocument).querySelectorAll(d);for(var e=d.length;0<=--e&&d.item(e)!==this;);return-1<e});V&&(W.prototype[V]="FormData");if(R){var X=P.XMLHttpRequest.prototype.setRequestHeader;P.XMLHttpRequest.prototype.setRequestHeader=function(d,e){X.call(this,
d,e);"content-type"===d.toLowerCase()&&(this.s=!0)};P.XMLHttpRequest.prototype.send=function(d){d instanceof W?(d=d._blob(),this.s||this.setRequestHeader("Content-Type",d.type),R.call(this,d)):R.call(this,d)}}S&&(P.fetch=function(d,e){e&&e.body&&e.body instanceof W&&(e.body=e.body._blob());return S.call(this,d,e)});T&&(P.navigator.sendBeacon=function(d,e){e instanceof W&&(e=e._asNative());return T.call(this,d,e)});P.FormData=W};
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/block-modules/FormieForm.js":
/*!********************************************!*\
  !*** ./src/js/block-modules/FormieForm.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _cms_vendor_verbb_formie_src_web_assets_frontend_src_js_formie_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-lib */ "./cms/vendor/verbb/formie/src/web/assets/frontend/src/js/formie-lib.js");
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var FormieForm=/*#__PURE__*/function(){function FormieForm(){_classCallCheck(this,FormieForm);this.instances=[];this.forms=[];}_createClass(FormieForm,[{key:"init",value:function init(){var _this=this;var elements=$(FormieForm.selector);if(elements.length){elements.each(function(index,element){_this.instances.push(element);if($('form.fui-form',element).length){var formElement=$('form.fui-form',element)[0];var formInstance=new _cms_vendor_verbb_formie_src_web_assets_frontend_src_js_formie_lib__WEBPACK_IMPORTED_MODULE_0__["Formie"]();formInstance.initForm(formInstance);_this.forms.push({element:formElement,instance:formInstance});}});}}},{key:"destroy",value:function destroy(){if(this.forms.length){for(var i=0;i<this.forms.length;i++){var form=this.forms[i];form.instance.destroyForm(form.element);}this.forms=[];}if(this.instances.length){this.instances=[];}}}]);return FormieForm;}();_defineProperty(FormieForm,"selector",'.section-formie_form--block');/* harmony default export */ __webpack_exports__["default"] = (FormieForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

}]);
//# sourceMappingURL=formie-form.bundle.js.map