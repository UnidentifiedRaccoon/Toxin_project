import './calendar.scss';

// Если у вас "убегает" календарь - закомментируйте строчки в datepicker.js
// set date (val) { - в этом сэттере запретить изменение координат
//.............................................
        // if (this.visible && this.elIsInput) {
        //     this.setPosition();
        // }
//.............................................


// set view (val) { - в этом сэттере запретить изменение координат
//.............................................
// if (this.elIsInput && this.visible) this.setPosition();
//.............................................

import 'air-datepicker/dist/js/datepicker.js';
import 'air-datepicker/dist/css/datepicker.min.css';


const firstInputClass = '.calendar__input--start'
const secondInputClass = '.calendar__input--end'

function setSecondInput(inputFinish) {
    function bindKeyboardEvents() {
        inputFinish.on('keydown.adp', this._onKeyDown.bind(this));
        inputFinish.on('keyup.adp', this._onKeyUp.bind(this));
        inputFinish.on('hotKey.adp', this._onHotKey.bind(this));
    }
    function focusHandler() {
        currentDatepicker.$datepicker[0].classList.add('active')
        currentDatepicker.$datepicker[0].style.left = '0px'
        currentDatepicker.$datepicker[0].style.top = currentDatepicker.el.closest('.calendar-box').offsetHeight + 12 + 'px'
    }

    let currentDatepicker = $(firstInputClass).datepicker().data('datepicker');

    inputFinish.on('focus', focusHandler)
    inputFinish.on('blur', currentDatepicker.hide.bind(currentDatepicker))
    bindKeyboardEvents.bind(currentDatepicker)()
}

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
}


function setSpecialOptions(mode) {
    // Конфигурация для каждого из календарей может отличаться от стандартной
    // Настроим эти конфигурации
    function onRenderCell(date, cellType) {
        if (cellType === 'day' && date.getDate() === options.minDate.getDate()) {
            return {
                disabled: true
            }
        }
    }

    if (mode === "index") {
    // if (mode === "two-fields-range") {
        options.minDate = new Date()
        options.range = true
        options.onRenderCell = onRenderCell
        options.multipleDatesSeparator = ' - '
        options.onSelect = function (fd) {
            $(firstInputClass).val(fd.split("-")[0]);
            $(secondInputClass).val(fd.split("-")[1]);
        }
    }

    if (mode === "catalog") {
    // if (mode === "one-field-range") {
        options.minDate = new Date()
        options.range = true
        options.dateFormat = 'd, M'
        options.onRenderCell = onRenderCell
        options.onSelect = function (fd) {
            let arr = fd.split(",")
            let row
            if (arr.length === 2) row = `${arr[0]} ${arr[1]}`
            else if ((arr.length === 4)) row = `${arr[0]} ${arr[1]} - ${arr[2]} ${arr[3]}`
            else row = fd

            $(firstInputClass).val(row);
        }
    }
}


$(function() {
    let calendarBox = $('.calendar-box')
    if (calendarBox.length) {
        // Дополняет базовые опции в зависимости от вып. условий
        setSpecialOptions(calendarBox[0].dataset.mode)

        // Инициализируем календарь на первом input
        $(firstInputClass).datepicker(options)

        // Если у нас календарь предполагает использование
        // второго поля input, то добавляем и его
        let inputFinish = $(secondInputClass)
        if (inputFinish) {
            setSecondInput(inputFinish)
        }

        // Вставляем календарь непосредственно в calendarBox (по дефолту от встраивается в конец body)
        let datepickerContainer = $('.datepickers-container')
        calendarBox.append(datepickerContainer)


        // Добавляем кнопку принять
        let buttonsWrapper = $('.datepicker--buttons');
        let applyButton = `<span class="datepicker--button" data-action="hide">Применить</span>`
        buttonsWrapper.append(applyButton);
    }

})









