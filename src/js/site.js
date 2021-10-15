import { LazySizes } from 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import Highway from '@dogstudio/highway';
import DefaultRenderer from './DefaultRenderer';
import DefaultTransition from './DefaultTransition';
import MainController from './MainController';

$(() => {
    const H = new Highway.Core({
        renderers: {
            common: DefaultRenderer
        },
        transitions: {
            common: DefaultTransition,
            default: DefaultTransition
        }
    });

    // Handle anchor links
    H.on('NAVIGATE_END', ({ location }) => {
        if (location.anchor) {
            // get element
            const el = document.querySelector(location.anchor);

            if (el) {
                window.scrollTo(el.offsetLeft, el.offsetTop);
            }
        }
    });
});