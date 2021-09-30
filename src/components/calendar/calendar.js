import './calendar.scss';
import 'air-datepicker/dist/js/datepicker.js';
import 'air-datepicker/dist/css/datepicker.min.css';

const firstInputClass = '.calendar__input--start'
const secondInputClass = '.calendar__input--end'


let options = {
    prevHtml: '<span class="calendar__prev">arrow_back</span>',
    nextHtml: '<span class="calendar__next">arrow_forward</span>',
    classes: 'calendar',
    clearButton: true,
    navTitles: { days: 'MM <i>yyyy</i>' },
    // inline: true,
    // onShow(inst) {
    //     inst.$datepicker[0].style.left = '0px'
    //     inst.$datepicker[0].style.top = inst.el.closest('.calendar-box').offsetHeight + 12 + 'px'
    // },
}

function setOpts(mode) {
    // Конфигурация для каждого из календарей может отличаться от стандартной
    // Настроим эти конфигурации
    function onRenderCell(date, cellType) {
        if (cellType === 'day' && date.getDate() === (new Date()).getDate()) {
            return {
                disabled: true
            }
        }
    }

    if (mode === "two-fields-range") {
        let additionalOpts = {
            minDate: new Date(),
            range: true,
            onRenderCell: onRenderCell,
            multipleDatesSeparator: ' - ',
            onSelect: function (fd) {
                $(firstInputClass).val(fd.split("-")[0]);
                $(secondInputClass).val(fd.split("-")[1]);
            },
        }
        return Object.assign({}, options, additionalOpts)
    }

    if (mode === "one-field-range") {
        let additionalOpts = {
            minDate: new Date(),
            range: true,
            dateFormat: 'd, M',
            onRenderCell: onRenderCell,
            onSelect: function (fd) {
                let arr = fd.split(",")
                let row
                if (arr.length === 2) row = `${arr[0]} ${arr[1]}`
                else if ((arr.length === 4)) row = `${arr[0]} ${arr[1]} - ${arr[2]} ${arr[3]}`
                else row = fd

                $(firstInputClass).val(row);
            },
        }
        return Object.assign({}, options, additionalOpts)
    }

    if (mode === "one-field") {
        return Object.assign({}, options)
    }
}

function show(box, event) {
    if (event.type === 'click') { event.stopPropagation(); }
    this.$datepicker[0].classList.add('active')
    this.$datepicker[0].style.left = '0px'
    this.$datepicker[0].style.top = box.offsetHeight + 12 + 'px'
}

function hide(event) {
    if (event.type === 'click') { event.stopPropagation(); }
    this.$datepicker[0].classList.remove('active')
}

function addApplyButton(box, datepicker) {
    let buttonsWrapper = box.querySelector('.datepicker--buttons');
    let applyButton = document.createElement('span')
    applyButton.textContent = "Применить"
    applyButton.setAttribute('data-action', 'hide')
    applyButton.setAttribute('class', 'datepicker--button')
    applyButton.addEventListener('click', hide.bind(datepicker))
    buttonsWrapper.append(applyButton);
}

function setInput(input, box, datepicker) {
    function bindKeyboardEvents() {
        input.on('keydown.adp', this._onKeyDown.bind(this));
        input.on('keyup.adp', this._onKeyUp.bind(this));
        input.on('hotKey.adp', this._onHotKey.bind(this));
    }


    box.addEventListener('focus', show.bind(datepicker, box), true)
    box.addEventListener('click', show.bind(datepicker, box))
    box.addEventListener('blur', hide.bind(datepicker), true)
    window.addEventListener('click', hide.bind(datepicker))
    bindKeyboardEvents.bind(datepicker)()
}


$(function() {
    let calendarBox = $('.calendar-box')
    if (calendarBox.length) {
        [...calendarBox].forEach(box => {
            let jQbox = $(box)
            let currentOpts = setOpts(box.dataset.mode)
            let datepicker = jQbox.datepicker().data('datepicker')

            // Инициализация календаря
            jQbox.datepicker(currentOpts)

            // Перемещение календаря
            let datepickerElem = jQbox.find('.datepicker.calendar')
            jQbox.append(datepickerElem)
            let inlineElement = jQbox.find('.datepicker-inline')
            jQbox.remove(inlineElement)





            let inputStart = jQbox.find(firstInputClass)
            setInput(inputStart, box, datepicker)

            let inputFinish = box.querySelector(secondInputClass)
            if (inputFinish) {
                setInput($(inputFinish), box, datepicker)
                inputFinish.addEventListener('keydown', event => {
                    if (event.keyCode === '9') {hide.bind(datepicker)()}
                })
            }


            addApplyButton(box, datepicker)

        })
    }


})









