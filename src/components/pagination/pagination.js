import './pagination.scss'

let pagination = document.querySelector('.pagination')

if (pagination) {
    let currentLink = pagination.querySelector('.pagination__link--current')
    let currentItem = currentLink.parentNode
    let currentNumber = parseInt(currentLink.textContent) - 1
    let pages = pagination.querySelectorAll('.pagination__item')

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


    let newPagination = document.createElement('div')
    newPagination.classList.add('pagination')
    let list = document.createElement('ul')
    list.classList.add('pagination__list')

    list.append(...result)
    newPagination.prepend(list)

    pagination.replaceWith(newPagination)
    if (currentNumber > 0) {
        newPagination.insertAdjacentHTML("afterbegin", buttonPrev)
    }
    if (currentNumber < pages.length-1) {
        newPagination.insertAdjacentHTML("beforeend", buttonNext)
    }

}