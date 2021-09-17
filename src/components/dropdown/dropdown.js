import './dropdown.scss'

// Все dropdown'ы имеют одинаковую основную разметку
// Каждому dropdown'у соответствует свой инстанс класса Dropdown
// класс Dropdown позволяет навесить все необходимые обработчики,
// при передачи в него ссылки на базовый элемент ('.dropdown')
let dropdowns = document.querySelectorAll('.dropdown')


class Dropdown {
    constructor(element) {
        this.dropdown = element;
        this.field = this.dropdown.querySelector('.dropdown__field')
        this.contentBox = element.querySelector('.dropdown__content-box')
        this.applyButton= this.contentBox.querySelector('.dropdown__button--apply');

        this.listenFieldFocus();
        this.listenEntryTab();
        this.listenExitTab();
        this.listenInnerButtonClicks();
        this.listenChangeGuest()
        this.listenResetAndApply()
    }

    listenFieldFocus() {
        this.field.addEventListener('focus', () => {
            this.contentBox.classList.add('js--dropdown__content-box')
        })
    }

    listenInnerButtonClicks() {
        // При первом клике на одной из кнопок блока this.contentBox
        // Добавляет класс 'js--dropdown__content-box'(display: block)

        // Если одна из кнопок в this.contentBox была нажата, то
        // необходимо добавить класс 'js--dropdown__content-box'
        // Иначе из за потери фокуса focus будет применено
        // css свойство display: none и this.contentBox - скроется
        console.log('listenInnerButtonClicks')
        function onClickContentBoxHandler(event) {
            let isButton = event.target.tagName === "INPUT"
            let disabled = event.target.disabled

            if (isButton && !disabled ) {

                let isClassAdded = this.contentBox.classList.contains('js--dropdown__content-box')

                if (!isClassAdded) {
                    this.contentBox.classList.add('js--dropdown__content-box')
                }
            }
        }
        let _this = this
        this.contentBox.addEventListener('click', onClickContentBoxHandler.bind(_this))
    }

    listenEntryTab() {
        // При переключении с this.field на кнопку блока this.contentBox
        // Добавляет класс 'js--dropdown__content-box'(display: block)

        function onTabFieldHandler(event) {
            let isTab = event.keyCode === 9
            let isClassAdded = this.contentBox.classList.contains('js--dropdown__content-box')
            if (isTab && !isClassAdded) {
                this.contentBox.classList.add('js--dropdown__content-box')
            }
        }
        let _this = this
        this.field.addEventListener('keydown', onTabFieldHandler.bind(_this))
    }

    listenExitTab() {
        // При переключении с последней кнопки блока this.contentBox
        // Удаляет класс 'js--dropdown__content-box'(display: block)
        function onTabFieldHandler(event) {
            let isTab = event.keyCode === 9
            let isClassAdded = this.contentBox.classList.contains('js--dropdown__content-box');
            if (isTab && isClassAdded) {
                this.contentBox.classList.remove('js--dropdown__content-box');
                this.apply()
            }
        }
        let _this = this
        this.applyButton.addEventListener('keydown', onTabFieldHandler.bind(_this))
    }

    listenChangeGuest() {
        // Обрабатывает клики увеличивающие и уменьшающие количество гостей
        function decrease(event) {
            let parentNode = event.target.parentNode
            let countElement = parentNode.querySelector('.dropdown__item-count')
            countElement.textContent = parseInt(countElement.textContent) + 1;
            let decreaseButton = parentNode.querySelector('.dropdown__item-button--decrease')
            if (parseInt(countElement.textContent) > 0) {
                decreaseButton.removeAttribute('disabled')
            }
        }
        function increase(event) {
            let parentNode = event.target.parentNode
            let countElement = parentNode.querySelector('.dropdown__item-count')
            countElement.textContent = parseInt(countElement.textContent) - 1;
            if (parseInt(countElement.textContent) < 1) {
                event.target.setAttribute('disabled', 'true')
            }
        }
        function increaseGuestClickHandler(event) {
            let isIncreaseButton = event.target.classList.contains('dropdown__item-button--increase')
            if (isIncreaseButton) decrease(event)
        }
        function decreaseGuestClickHandler(event) {
            let isDecreaseButton = event.target.classList.contains('dropdown__item-button--decrease')
            if (isDecreaseButton) increase(event)
        }
        let _this = this;
        this.contentBox.addEventListener('click', increaseGuestClickHandler.bind(_this))
        this.contentBox.addEventListener('click', decreaseGuestClickHandler.bind(_this))

    }

    listenResetAndApply() {
        // Объединено для прослушивания события на уровне this.contentBox
        let _this = this

        function keyDownHandler(event) {
            let isResetButton = event.target.classList.contains('dropdown__button--reset')
            let isApplyButton = event.target.classList.contains('dropdown__button--apply')
            if (isApplyButton) _this.apply();
            else  if (isResetButton) _this.reset();
        }

        this.contentBox.addEventListener('click', keyDownHandler)
    }

    reset() {
        // Сброс данных, очистка поля, закрытие this.contentBox
        this.field.setAttribute('value', '')
        let items = this.contentBox.querySelectorAll('.dropdown__item');
        for (let i = 0; i < items.length; i++) {
            let currentItem= items[i];
            currentItem.querySelector('.dropdown__item-button--decrease').setAttribute('disabled', 'true');
            currentItem.querySelector('.dropdown__item-count').textContent = 0;
        }
        this.contentBox.classList.remove('js--dropdown__content-box');
    }

    apply() {
        // Сохранение данных в поле, закрытие this.contentBox
        let items = this.contentBox.querySelectorAll('.dropdown__item');
        let guestsAmount = 0;
        let babiesAmount = 0;
        for (let i = 0; i < items.length; i++) {
            let currentItem = items[i];
            let currentValue = parseInt(currentItem.querySelector('.dropdown__item-count').textContent)

            if (currentItem.dataset.item === '2') {
                babiesAmount += currentValue;

            } else {
                guestsAmount += currentValue;
            }
        }
        let result = []
        if (guestsAmount > 0) {
            if (guestsAmount === 1) {
                result.push('1 гость');
            } else if (guestsAmount < 5) {
                result.push(guestsAmount + ' гостя');
            } else if (guestsAmount < 21) {
                result.push(guestsAmount + ' гостей');
            }
        }


        if (babiesAmount > 0) {
            if (babiesAmount === 1) {
                result.push('1 младенец');
            } else if (babiesAmount < 5) {
                result.push(babiesAmount + ' младенца');
            } else if (babiesAmount < 21) {
                result.push(babiesAmount + ' младенцев');
            }
        }


        this.field.removeAttribute('readonly');
        this.field.setAttribute('value', `${result.join(', ')}`)
        this.field.setAttribute('readonly', 'true');

        this.contentBox.classList.remove('js--dropdown__content-box');
    }
}

// Создаем инстанс на каждый dropdown и сохраняем его
let dropdownInstances = [];
for (let i = 0; i < dropdowns.length; i++) {
    dropdownInstances.push(new Dropdown(dropdowns[i]));
}