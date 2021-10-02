import './room-card.scss'

// Навешивание слушателей на каждую карточку - плохая практика
// Следую принципу делегирования, мы должны использовать listener
// на внешнем блоке - контейнере всех элементов, поэтому, код отвечающий
// за логику карточек находится в catalog.js

let list = document.querySelector('.catalog__list')

class roomCard {
    constructor(card, i) {
        this.card = card
        this.images = card.querySelectorAll('.room-card__slide')
        this.actualImgNumb = 0;
        this.index = i
        this.buttonPrev = card.querySelector('.room-card__button--prev')
        this.buttonNext = card.querySelector('.room-card__button--next')
        this.points = card.querySelectorAll('.room-card__slider-point')
        this.setDataset()
    }

    setDataset() {
        this.buttonPrev.setAttribute('data-slider-number', this.index)
        this.buttonPrev.setAttribute('data-type', 'prev')
        this.buttonNext.setAttribute('data-slider-number', this.index)
        this.buttonNext.setAttribute('data-type', 'next')
    }

    prev() {
        this.hide()
        this.actualImgNumb--
        if (this.actualImgNumb === -1) {
            this.actualImgNumb = this.images.length - 1
        }
        this.show()
    }

    next() {
        this.hide()
        this.actualImgNumb++
        if (this.actualImgNumb === this.images.length) {
            this.actualImgNumb = 0
        }
        this.show()
    }

    hide() {
        this.images[this.actualImgNumb].classList.add('room-card__slide--hidden')
        this.points[this.actualImgNumb].classList.remove('room-card__slider-point--current')
    }

    show() {
        this.images[this.actualImgNumb].classList.remove('room-card__slide--hidden')
        this.points[this.actualImgNumb].classList.add('room-card__slider-point--current')
    }
}

function getCardInstances(cards) {
    let cardsInstances = []
    for (let i = 0; i < cards.length; i++) {
        cardsInstances.push(new roomCard(cards[i], i))
    }
    return cardsInstances
}

function sliderClickHandler(cardsInstances, event) {
    console.log(arguments)
    if (event.target.tagName === 'BUTTON') {
        event.preventDefault();
        let card = cardsInstances[parseInt(event.target.dataset.sliderNumber)]
        if (event.target.dataset.type === 'prev') {
            card.prev()
        } else if (event.target.dataset.type === 'next') {
            card.next()
        } else {
            console.log('Ошибка при перелистывании слайдера')
        }
    }
}


if (list) {
    let cards = list.querySelectorAll('.room-card')
    let cardsInstances = getCardInstances(cards)
    list.addEventListener('click',  sliderClickHandler.bind(null, cardsInstances))
} else {
    let cards = document.querySelectorAll('.room-card')
    console.log(cards)
    let cardsInstances = getCardInstances(cards)
    console.log(cardsInstances)
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click',  sliderClickHandler.bind(null, cardsInstances))
    }
}



