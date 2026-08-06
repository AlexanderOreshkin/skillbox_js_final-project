const burgerMenu = document.querySelector('.main-menu')
const burgerOpenBtn = document.querySelector('.header__catalog-btn')
const burgerCloseBtn = document.querySelector('.main-menu__close')

export function openBurgerMenu() {
    burgerOpenBtn.addEventListener('click', () => {
        burgerMenu.classList.add('main-menu--active')
    })
}

export function closeBurgerMenu() {
    burgerCloseBtn.addEventListener('click', () => {
        burgerMenu.classList.remove('main-menu--active')
    })
}