import './catalog.scss'

let filterButton = document.querySelector('.catalog__filter-toggle')

let filter = document.querySelector('.catalog__wrapper-left')

if (filterButton) {
    filterButton.addEventListener('click', () => {
        filter.classList.toggle('active')
        filterButton.classList.toggle('active')
    })
}

