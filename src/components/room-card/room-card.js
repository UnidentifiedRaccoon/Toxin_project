import './room-card.scss'

// Навешивание слушателей на каждую карточку - плохая практика
// Следую принципу делегирования, мы должны использовать listener
// на внешнем блоке - контейнере всех элементов, поэтому, код отвечающий
// за логику карточек находится в catalog.js