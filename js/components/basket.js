// import { getData } from "./getData.js";
const basketOpenBtn = document.querySelector('.header__user-btn')
const basket = document.querySelector('.basket')
let cartItems = [];
let counter = 0;
const basketCounter = document.querySelector('.header__user-count')
let allProductsData = [];

export function openBasket() {
    basketOpenBtn.addEventListener('click', () => {
        basket.classList.toggle('basket--active')
    })
    checkBasket()
}

export function setProductsData(data) {
    allProductsData = data;
}


export function getBasketCardEl(img, name, newPrice, id) {
    const basketCardEl = document.createElement('li');
    basketCardEl.classList.add('basket__item');

    basketCardEl.innerHTML = `
                 <div class="basket__img">
                  <img src="${img.slice(3)}" alt="Фотография товара" height="60" width="60">
                </div>
                <span class="basket__name">${name}</span>
                <span class="basket__price">${newPrice}</span>
                <button class="basket__close" type="button">
                  <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                  </svg>
                </button>
  `
    const closeBtn = basketCardEl.querySelector('.basket__close');

    closeBtn.addEventListener('click', () => {
        removeFromCart(id);
    });

    return basketCardEl
}


export function initCartButtons() {
    const buttons = document.querySelectorAll('.btn--icon');
    
    buttons.forEach(button => {
        // Убираем старый обработчик, если он есть
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productId = parseInt(newButton.getAttribute('data-id'));
            if (isNaN(productId)) return;
            
            const productToAdd = allProductsData.find(product => product.id === productId);
            if (!productToAdd) return;
            
            const existingItem = cartItems.find(item => item.id === productId);
            if (existingItem) {
                alert('Товар уже в корзине'); 
                return;
            }
            
            cartItems.push(productToAdd);
            renderBasketList(cartItems);
            checkBasket();
            counter++;
            basketCounter.textContent = counter;
        });
    });
}

export function addToCart(data) {
    if (data) {
        allProductsData = data;
    }
    initCartButtons();
}


export function renderBasketList(data) {
    const basketList = document.querySelector('.basket__list');
    basketList.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        basketList.append(getBasketCardEl(data[i].image, data[i].name, data[i].price.new, data[i].id))
    }
}

function checkBasket() {
    if (cartItems.length === 0) {
        document.querySelector('.basket__empty-block').classList.remove('visually-hidden')
        document.querySelector('.basket__link.btn').classList.add('visually-hidden')
    } else {
        document.querySelector('.basket__link.btn').classList.remove('visually-hidden')
        document.querySelector('.basket__empty-block').classList.add('visually-hidden')
    }
}

function removeFromCart(id) {
    const index = cartItems.findIndex(item => item.id === id);
    
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    
    renderBasketList(cartItems);
    checkBasket();
    counter--;
    basketCounter.textContent = counter;
}