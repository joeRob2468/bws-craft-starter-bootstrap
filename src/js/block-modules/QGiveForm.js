import ScriptLoader from '../utils/ScriptLoader';

class QGiveForm {
    static selector = '.section-qgive_form--block';

    constructor() {
        this.instances = [];
    }

    async init() {
        let elements = $(QGiveForm.selector);
        if (elements.length) {
            elements.each((index, element) => {
                this.instances.push(element);
            });
            let loader = new ScriptLoader({
                src: 'secure.qgiv.com/resources/core/js/embed.js',
                global: 'QGIV',
                protocol: 'https:'
            });

            let qgive = await loader.load();
            if (typeof qgive !== 'undefined') {
                qgive.Embed.init();
            }
        }
    }

    destroy() {
        if (this.instances.length) {
            this.instances = [];
        }
    }
}

export default QGiveForm;