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
    onShow(inst) {
        inst.$datepicker[0].style.left = '0px'
        inst.$datepicker[0].style.top = inst.el.closest('.calendar-box').offsetHeight + 12 + 'px'
    },
    onSelect(fd, date, inst) {
        inst.$el.find(firstInputClass).val(fd);
    },
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
            onSelect: function (fd, data, inst) {
                inst.$el.find(firstInputClass).val(fd.split("-")[0]);
                inst.$el.find(secondInputClass).val(fd.split("-")[1]);
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
            onSelect: function (fd, date, inst) {
                let arr = fd.split(",")
                let row
                if (arr.length === 2) row = `${arr[0]} ${arr[1]}`
                else if ((arr.length === 4)) row = `${arr[0]} ${arr[1]} - ${arr[2]} ${arr[3]}`
                else row = fd

                inst.$el.find(firstInputClass).val(row);
            },
        }
        return Object.assign({}, options, additionalOpts)
    }

    if (mode === "one-field") {
        return Object.assign({}, options)
    }
}
//
// function hide(event) {
//     this.hide()
// }

function addApplyButton(box, datepicker) {
    let buttonsWrapper = box.querySelector('.datepicker--buttons');
    let applyButton = document.createElement('span')
    applyButton.textContent = "Применить"
    applyButton.setAttribute('data-action', 'hide')
    applyButton.setAttribute('class', 'datepicker--button')
    applyButton.addEventListener('click', datepicker.hide.bind(datepicker))
    buttonsWrapper.append(applyButton);
}

function setInput(input, datepicker) {
    function bindKeyboardEvents() {
        input.on('keydown.adp', this._onKeyDown.bind(this));
        input.on('keyup.adp', this._onKeyUp.bind(this));
        input.on('hotKey.adp', this._onHotKey.bind(this));
    }

    function bindEvents() {
        input.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this));
        input.on('mouseup.adp', this._onMouseUpEl.bind(this));
        input.on('blur.adp', this._onBlur.bind(this));
        input.on('keyup.adp', this._onKeyUpGeneral.bind(this));
        $(window).on('resize.adp', this._onResize.bind(this));
        $('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
        this.$datepicker.on('mousedown', this._onMouseDownDatepicker.bind(this));
        this.$datepicker.on('mouseup', this._onMouseUpDatepicker.bind(this));
    }

    bindEvents.bind(datepicker)()
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
            let inlineElement =box.querySelector('.datepicker-inline')
            box.removeChild(inlineElement)


            let inputStart = jQbox.find(firstInputClass)
            setInput(inputStart, datepicker)

            let inputFinish = jQbox.find(secondInputClass)
            if (inputFinish.length > 0) {
                setInput(inputFinish, datepicker)
            }

            addApplyButton(box, datepicker)
        })
    }


})









