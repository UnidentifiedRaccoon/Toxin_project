import './room-card.scss'
import * as events from "events";

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

if (list) {
    let cards = list.querySelectorAll('.room-card')
    let cardsInstances = []
    for (let i = 0; i < cards.length-1; i++) {
        cardsInstances.push(new roomCard(cards[i], i))
    }

    list.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            event.preventDefault();
            let card = cardsInstances[parseInt(event.target.dataset.sliderNumber)]
            if (event.target.dataset.type === 'prev') {
                card.prev()
            } else if (event.target.dataset.type === 'next') {
                card.next()
            } else {
                console('Ошибка при перелистывании слайдера')
            }

        }
    })
}
