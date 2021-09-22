import './range-slider.scss'

import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';



let rangeSlider = document.querySelector('.range-slider')

if (rangeSlider) {
    let rangeSliderBar = rangeSlider.querySelector('.range-slider__bar')

    noUiSlider.create(rangeSliderBar, {
        start: [5000, 10000],
        connect: true,
        margin: 500,
        format: wNumb({
            decimals: 0,
            thousand: ' ',
            suffix: '₽',
        }),
        range: {
            'min': [1000, 100],
            '30%': [4000, 250],
            '60%': [10000, 500],
            '90%': [20000, 500],
            'max': [30000]
        }
    });

    let field1 = rangeSlider.querySelector('.range-slider__field--0')
    let field2 = rangeSlider.querySelector('.range-slider__field--1')
    let fields = [field1, field2]

    rangeSliderBar.noUiSlider.on('update', function(values, handle)  {
        fields[handle].textContent = values[handle]
    })
}

