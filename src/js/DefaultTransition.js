// Import Highway
import Highway from '@dogstudio/highway';

class DefaultTransition extends Highway.Transition {
    // Built-in methods
    in({ from, to, trigger, done }) {
        window.scrollTo(0, 0);

        $('.revealer').removeClass('animate-in').addClass('animate-out');
        setTimeout(() => {
            $('.revealer').removeClass('animate-out');
            done();
        }, 600);
    }

    out({ from, trigger, done }) {
        $('.revealer').addClass('animate-in');
        setTimeout(() => {
            from.remove();
            done();
        }, 600);
    }
}

// Don`t forget to export your transition
export default DefaultTransition;