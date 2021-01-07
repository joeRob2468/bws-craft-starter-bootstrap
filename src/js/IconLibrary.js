import feather from 'feather-icons';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

class IconLibrary {
    // main class initialization - runs once on site load
    constructor() {
    }

    // initialization - runs each time a new page is loaded
    init() {
        try {
            // replace feather markup with SVGs
            feather.replace({
                class: 'icon'
            });

            // add fontawesome icons to library
            library.add(fas, fab);
            // watch dom for fontawesome icon replacements
            dom.watch();

        } catch (e) {
            console.log(e);
        }
    }

    // Runs every time a new page replaces the current one
    // Destroys all scripts on the page, so they can be reinitialized on the new one
    destroy() {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}

export default IconLibrary;