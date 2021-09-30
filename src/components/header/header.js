import './header.scss';

let menuButton = document.querySelector('.header__menu-toggle')

let menu = document.querySelector('.header__menu-wrapper')

if (menuButton) {
    menuButton.addEventListener('click', () => {
        menu.classList.toggle('active')
        menuButton.classList.toggle('active')
    })
}