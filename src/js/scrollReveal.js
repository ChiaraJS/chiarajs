/* ScrollReveal.js */
window.sr = ScrollReveal();

sr.reveal('.reveal-title', {
    origin: 'top',
    duration: 5000,
    distance: '200px',
    scale: 0.5
});

/* OTHER PARAMS
const reveal = {
    origin: 'bottom',                           // Can be also left', 'top', 'right'
    duration: 500,                              // Time in milliseconds
    delay: 0,                                   // Time in milliseconds
    distance: '20px',                           // Can be any valid CSS distance: '5rem', '10%' ...
    rotate: { x: 0, y: 0, z: 0 },               // Starting angles in degrees, will transition from these values to 0 in all axes.
    opacity: 0,                                 // Starting opacity value, before transitioning to the computed opacity.
    scale: 0.9,                                 // Starting scale value, will transition from this value to 1
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',   // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
    mobile: true,                               // true/false to control reveal animations on mobile.
    reset: false,                               // true:  reveals occur every time elements become visible
                                                // false: reveals occur once as elements become visible

    container: window.document.documentElement, // `<html>` is the default reveal container. You can pass either:
                                                // DOM Node, e.g. document.querySelector('.fooContainer')
                                                // Selector, e.g. '.fooContainer'

    useDelay: 'always',                         // 'always' — delay for all reveal animations
                                                // 'once'   — delay only the first time reveals occur
                                                // 'onload' - delay only for animations triggered by first load

    viewFactor: 0.2,                            // Change when an element is considered in the viewport. The default value
                                                // of 0.20 means 20% of an element must be visible for its reveal to occur.

    viewOffset: {                               // Pixel values that alter the container boundaries.
        top: 0, right: 0, bottom: 0, left: 0    // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
    },                                          // Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png

                                                // Callbacks that fire for each triggered element reveal, and reset.
    beforeReveal: function (domEl) {},
    beforeReset: function (domEl) {},

                                                // Callbacks that fire for each completed element reveal, and reset.
    afterReveal: function (domEl) {},
    afterReset: function (domEl) {},
}
*/
