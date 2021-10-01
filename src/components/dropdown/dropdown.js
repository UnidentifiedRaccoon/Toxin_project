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
        let buttons = this.contentBox.querySelectorAll('button');

        this.edgeButton = buttons[buttons.length - 1];

        this.listenFieldFocus();
        this.listenExitTab();
        this.listenEntryTab();
        this.listenInnerButtonClicks();
        this.listenChangeButtonsClick()
        this.listenChange()
        this.listenResetAndApply()

        // ToDo спросить у кого-то умного как это лучше сделать
        let _this = this;
        this.dropdown.addEventListener('click', function(event) {event.stopPropagation();})
        window.addEventListener('click', function() {
            _this.apply()
        })
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
            let isClassAdded = _this.contentBox.classList.contains('js--dropdown__content-box');
            if (isTab && isClassAdded) {
                _this.contentBox.classList.remove('js--dropdown__content-box');
                _this.apply()
            }
        }
        let _this = this
        this.edgeButton.addEventListener('keydown', onTabFieldHandler)
    }

    listenChange() {
        function handler(event) {
            let isChangeButton = event.target.classList.contains('dropdown__item-button')
            let isCountField = event.target.classList.contains('dropdown__item-count')

            if (isChangeButton || isCountField) {
                let parent = event.target.closest('.dropdown__button-box')
                let incBtn = parent.querySelector('.dropdown__item-button--increase')
                let decBtn = parent.querySelector('.dropdown__item-button--decrease')
                let countField = parent.querySelector('.dropdown__item-count')
                let value = parseInt(countField.value)
                let max = parseInt(countField.max)
                let min = parseInt(countField.min)
                if (value >= max) {
                    countField.value = max;
                    incBtn.setAttribute('disabled', 'true')
                }
                else if (value <= min) {
                    countField.value = min;
                    decBtn.setAttribute('disabled', 'true')
                }

                if (value > min) {
                    decBtn.removeAttribute('disabled')
                }
                if (value < max) {
                    incBtn.removeAttribute('disabled')
                }
            }
        }
        this.contentBox.addEventListener('change', handler)
        this.contentBox.addEventListener('click', handler)
    }

    listenChangeButtonsClick() {
        function handler(event) {
            let isChangeButton = event.target.classList.contains('dropdown__item-button')
            if (isChangeButton) {
                let isIncrease = (event.target.dataset.operation === 'increase')
                let isDecrease = (event.target.dataset.operation === 'decrease')
                let parent = event.target.closest('.dropdown__button-box')
                let countField = parent.querySelector('.dropdown__item-count')

                if (isIncrease) {
                    countField.value++
                } else if (isDecrease) {
                    countField.value--
                }
            }

        }
        this.contentBox.addEventListener('click', handler)
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
            currentItem.querySelector('.dropdown__item-count').value = 0;
        }
        this.contentBox.classList.remove('js--dropdown__content-box');
    }

    apply() {
        // Сохранение данных в поле, закрытие this.contentBox
        const items = this.contentBox.querySelectorAll('.dropdown__button-box');
        const amounts = []
        for (let i = 0; i < items.length; i++) {
            let amountElem = items[i].querySelector('.dropdown__item-count');
            amounts[i] = parseInt(amountElem.value)
        }
        const result = []

        const textForms = {
            guest: ['гость', 'гостя', 'гостей'],
            baby: ['младенец', 'младенца', 'младенцев'],
            sleepRoom: ['спальня', 'спальни', 'спален'],
            bed: ['кровать', 'кровати', 'кроватей'],
            bathRoom: ['ванная', 'ванные', 'ванных'],
        }

        function constructRow(amount, dict) {
            let row
            if (amount > 0) {
                // 11-20, 111-120 итд
                if (amount % 100 >= 10 && amount % 100 < 21) {
                    row = amount + ' ' + dict[2];
                } else if (amount % 10 === 1) {
                    row = '1' + ' ' + dict[0];
                } else if (amount % 10 < 5) {
                    row = amount + ' ' + dict[1];
                } else  {
                    row = amount + ' ' + dict[2];
                }
            }
            return row;
        }



        if (this.dropdown.dataset.mode === "persons") {

            let guestsAmount = amounts[0] + amounts[1]
            let babiesAmount = amounts[2]

            result.push(constructRow(guestsAmount, textForms.guest));
            result.push(constructRow(babiesAmount, textForms.baby));
        }

        else if (this.dropdown.dataset.mode === "facilities") {

            let slippingRooms = amounts[0];
            let beds = amounts[1];
            let bathrooms = amounts[2];

            result.push(constructRow(slippingRooms, textForms.sleepRoom));
            result.push(constructRow(beds, textForms.bed));
            result.push(constructRow(bathrooms, textForms.bathRoom));
        }



        this.field.removeAttribute('readonly');
        this.field.setAttribute('value', `${result.filter(item => item).join(', ')}`)
        this.field.setAttribute('readonly', 'true');

        this.contentBox.classList.remove('js--dropdown__content-box');
    }
}

// Создаем инстанс на каждый dropdown и сохраняем его
let dropdownInstances = [];
for (let i = 0; i < dropdowns.length; i++) {
    dropdownInstances.push(new Dropdown(dropdowns[i]));
}