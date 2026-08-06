import { getData } from "./getData.js";

export function getProductCardEl(img, name, oldPrice, newPrice, id) {
    const productCardEl = document.createElement('li');
    productCardEl.classList.add('catalog__item');

    productCardEl.innerHTML = `
              <div class="product-card">
                <div class="product-card__visual">
                  <img class="product-card__img" src="${img.slice(3)}" height="436" width="290"
                       alt="Изображение товара">
                  <div class="product-card__more">
                    <a href="#" class="product-card__link btn btn--icon" data-id = "${id}">
                      <span class="btn__text">В корзину</span>
                      <svg width="24" height="24" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-basket"></use>
                      </svg>
                    </a>
                    <a href="#" class="product-card__link btn btn--secondary">
                      <span class="btn__text">Подробнее</span>
                    </a>
                  </div>
                </div>
                <div class="product-card__info">
                  <h2 class="product-card__title">${name}</h2>
                  <span class="product-card__old">
                  <span class="product-card__old-number">${oldPrice}</span>
                  <span class="product-card__old-add">₽</span>
                </span>
                  <span class="product-card__price">
                  <span class="product-card__price-number">${newPrice}</span>
                  <span class="product-card__price-add">₽</span>
                </span>
                  <div class="product-card__tooltip tooltip">
                    <button class="tooltip__btn" aria-label="Показать подсказку">
                      <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-i"></use>
                      </svg>
                    </button>
                    <div class="tooltip__content">
                      <span class="tooltip__text">Наличие товара по городам:</span>
                      <ul class="tooltip__list">
                        <li class="tooltip__item">
                          <span class="tooltip__text">Москва: <span class="tooltip__count">454</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Оренбург: <span class="tooltip__count">381</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">15</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
  `
    return productCardEl
}

// export function renderProductList(data) {
//     const productList = document.querySelector('.catalog__list');
//     productList.innerHTML = '';

//         for (let i = 0; i < data.length; i++) {
//             productList.append(getProductCardEl(data[i].image, data[i].name, data[i].price.old, data[i].price.new, data[i].id))
//         }


//   }
    
// ИЗМЕНЕНО: добавлены параметры currentPage и itemsPerPage
export function renderProductList(data, currentPage = 1, itemsPerPage = 6) {
    const productList = document.querySelector('.catalog__list');
    productList.innerHTML = '';

    // НОВОЕ: вычисление индексов для пагинации
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // НОВОЕ: получение товаров только для текущей страницы
    const productsToRender = data.slice(startIndex, endIndex);

    // ИЗМЕНЕНО: используем productsToRender вместо data
    for (let i = 0; i < productsToRender.length; i++) {
        productList.append(getProductCardEl(productsToRender[i].image, productsToRender[i].name, productsToRender[i].price.old, productsToRender[i].price.new, productsToRender[i].id))
    }

    // НОВОЕ: вызов функции обновления пагинации
    updatePagination(data.length, currentPage, itemsPerPage);
}

// НОВОЕ: функция для создания кнопок пагинации
function updatePagination(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.querySelector('.catalog__pagination');
    
    paginationContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('catalog__pagination-item');
        
        const buttonLink = document.createElement('button');
        buttonLink.classList.add('catalog__pagination-link');
        if (i === currentPage) {
            buttonLink.classList.add('active');
        }
        buttonLink.textContent = i;
        buttonLink.dataset.page = i;
        
        buttonLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.onPageChange) {
                window.onPageChange(i);
            }
        });
        
        li.appendChild(buttonLink);
        paginationContainer.appendChild(li);
    }
}