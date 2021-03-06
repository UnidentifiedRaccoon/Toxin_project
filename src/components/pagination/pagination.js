import './pagination.scss'

let paginations = document.querySelectorAll('.pagination')

if (paginations.length > 0) {
    for (let i = 0; i < paginations.length; i++) {
        let pagination = paginations[i]

        let currentLink = pagination.querySelector('.pagination__link--current')
        let currentItem = currentLink.parentNode
        let currentNumber = parseInt(currentLink.textContent) - 1
        let pages = pagination.querySelectorAll('.pagination__item')

        // Поиск элементов пагинации
        let first = pages[0]
        let last = pages[pages.length - 1]
        let prev = [pages[currentNumber-2], pages[currentNumber-1]]
        let next = [pages[currentNumber+1], pages[currentNumber+2]]
        let ellipsis = document.createElement('li')
        ellipsis.classList.add('pagination__item')
        ellipsis.classList.add('pagination__item--ellipsis')
        ellipsis.textContent = '...'
        let result = []
        let buttonPrev = "<button class='pagination__button pagination__button--prev'></button>"
        let buttonNext = "<button class='pagination__button pagination__button--next'></button>"

        // Сборка пагинации f ... prev1 prev2 current next1 next2 ... l
        if (currentNumber - 3 >= 0) result.push(first)
        if (currentNumber - 4 >= 0) result.push(ellipsis)
        if (currentNumber - 2 >= 0) result.push(prev[0])
        if (currentNumber - 1 >= 0) result.push(prev[1])
        result.push(currentItem)
        if (currentNumber + 1 <= pages.length-1) result.push(next[0])
        if (currentNumber + 2 <= pages.length-1) result.push(next[1])
        if (currentNumber + 4 <= pages.length-1) result.push(ellipsis.cloneNode(true))
        if (currentNumber + 3 <= pages.length-1) result.push(last)

        // Вставка пагинации
        let newPagination = document.createElement('div')
        newPagination.classList.add('pagination')
        let list = document.createElement('ul')
        list.classList.add('pagination__list')

        list.append(...result)
        newPagination.prepend(list)
        let p = pagination.querySelector('.pagination__text')
        newPagination.append(p)

        // Вставка кнопок вперед/назад
        pagination.replaceWith(newPagination)
        if (currentNumber > 0) {
            list.insertAdjacentHTML("beforebegin", buttonPrev)
        }
        if (currentNumber < pages.length-1) {
            list.insertAdjacentHTML("afterend", buttonNext)
        }

    }

}