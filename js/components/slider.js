export function getSliderCardEl(img, name, oldPrice, newPrice, id) {
    const sliderCardEl = document.createElement('li');
    sliderCardEl.classList.add('day-products__item', 'swiper-slide');

    sliderCardEl.innerHTML = `
              <div class="product-card product-card--small">
              <div class="product-card__visual">
                <img class="product-card__img" src="${img.slice(3)}" height="344" width="290"
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
              </div>
            </div>
  `
    return sliderCardEl
}

export function renderSliderList(data) {
    const sliderList = document.querySelector('.day-products__list');
    sliderList.innerHTML = '';
    const sliderData = data.filter(product => product.goodsOfDay === true);
        for (let i = 0; i < sliderData.length; i++) {
            sliderList.append(getSliderCardEl(sliderData[i].image, sliderData[i].name, sliderData[i].price.old, sliderData[i].price.new, sliderData[i].id))
        }


  }

  export function initSlider() {
 
    const swiper = new Swiper('.day-products__slider', {
        navigation: {
            nextEl: '.day-products__navigation-btn--next',
            prevEl: '.day-products__navigation-btn--prev',
        },
        spaceBetween: 40, 
        slidesPerView: 4,
        
    });
}