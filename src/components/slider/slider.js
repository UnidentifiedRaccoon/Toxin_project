import './slider.scss'


let index  = document.querySelector('.index');
let signIn = document.querySelector('.sign-in');
let signUp = document.querySelector('.sign-up');

function getIndexSlides() {
    let result = [];
    let slides = [1, 2, 3];

    for (let i of slides) {
        let div = document.createElement('div');
        div.classList.add(`slider`);
        div.classList.add(`slider__slide-${i}`);
        result.push(div);
    }
    return result;
}

function getSignPagesSlides() {
    let result = [];
    let slides = [3, 4]
    for(let i of slides) {
        let div = document.createElement('div');
        div.classList.add(`slider`);
        div.classList.add(`slider__slide-${i}`);
        result.push(div);
    }
    return result;
}

if (index) {
    index.prepend(...getIndexSlides());
}
else if (signIn) {
    signIn.prepend(...getSignPagesSlides());
}

else if (signUp) {
    signUp.prepend(...getSignPagesSlides());
}
