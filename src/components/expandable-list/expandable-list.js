import './expandable-list.scss'
let lists = document.querySelectorAll('.expandable')

for (let i = 0; i < lists.length; i++) {
    lists[i].addEventListener('click', (event) => {

        let button = event.target
        let isExpButton = button.classList.contains('expandable__button')

        if (isExpButton) {
            let box = button.closest('.expandable')
            let list = box.querySelector('.expandable__list')

            button.classList.toggle('active')
            list.classList.toggle('active')
        }
    })
}

