'use strict';

let bottomUpArrow = document.querySelector('.bottomUpArrow');

const bottomToggle = () => {
    bottomUpArrow.classList.toggle('bottomActiv');
};

document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 500) {

        if (!bottomUpArrow.classList.contains('bottomActiv')) {
            bottomToggle();
        }
    } else {
        if (bottomUpArrow.classList.contains('bottomActiv')) {
            bottomToggle();
        }
    }
});