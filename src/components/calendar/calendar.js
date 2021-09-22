import './calendar.scss';
import 'air-datepicker/dist/css/datepicker.min.css';
import 'air-datepicker/dist/js/datepicker.min.js';

let index = document.querySelector('.index')
let catalog = document.querySelector('.catalog');
let signUp = document.querySelector('.sign-up')

let options = {
    classes: "calendar",
    prevHtml:'<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.1757 8.01562V9.98438H3.98819L9.56632 15.6094L8.16007 17.0156L0.144441 9L8.16007 0.984375L9.56632 2.39062L3.98819 8.01562H16.1757Z" fill="#BC9CFF"/></svg>',
    nextHtml:'<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.36252 0.984375L16.3781 9L8.36252 17.0156L6.95627 15.6094L12.5344 9.98438H0.346894V8.01562H12.5344L6.95627 2.39062L8.36252 0.984375Z" fill="#BC9CFF"/></svg>',
    autoClose: true,
    clearButton: true,
    inline: true,

}

if (index) {
    $(document).ready(function () {

        options.minDate = new Date()
        options.range = true
        options.multipleDatesSeparator = ' - '
        options.onSelect = function (fd) {
            $('.js--calendar-field--start').val(fd.split("-")[0]);
            $('.js--calendar-field--end').val(fd.split("-")[1]);
        }

        $('.js--calendar-field--start').datepicker(options);
    })
}

if (catalog) {

    $(document).ready(function () {

        options.minDate = new Date()
        options.range = true
        options.dateFormat = 'd, M'
        options.onSelect = function (fd) {
            let arr = fd.split(",")
            let row
            if (arr.length === 2) row = `${arr[0]} ${arr[1]}`
            else if ((arr.length === 4)) row = `${arr[0]} ${arr[1]} - ${arr[2]} ${arr[3]}`
            else row = fd

            $('.js--calendar-field--start').val(row);
        }

        $('.js--calendar-field--start').datepicker(options);
    })

    // Добавляет класс фиксированной ширины
    let intervalId = setInterval(() => {
        let calendar = document.querySelector('.calendar');
        if (calendar) {
            calendar.classList.add('js--filter-calendar');
            clearInterval(intervalId);
        }
    }, 500)


}

if (signUp) {
    $(document).ready(function () {
        $('.js--calendar-field--start').datepicker(options);
    })
}


// Находит календарь, добавляет в него кнопку apply,
// навешивает на неё обработчик handler = hide - позаимствован из библиотеки
let intervalId = setInterval(() => {
    let calendar = document.querySelector('.calendar');
    if (calendar) {
        console.log('Calendar')
        let currentDatepicker = $('.js--calendar-field--start').datepicker().data('datepicker')
        let buttonsWrapper = calendar.querySelector('.datepicker--buttons');
        let applyButton = document.createElement('span');
        applyButton.classList.add('datepicker--button');
        applyButton.textContent = 'Применить'
        applyButton.addEventListener('click', currentDatepicker.hide)
        buttonsWrapper.appendChild(applyButton);
        calendar.classList.add('js--filter-calendar');
        clearInterval(intervalId);
    }
}, 500)








