import { getData } from "./components/getData.js";
import { renderSliderList, initSlider } from "./components/slider.js";
import { getBasketCardEl } from "./components/basket.js";
import { openBasket, addToCart, initCartButtons } from "./components/basket.js";
import { initFilter } from "./components/filter.js";
import { openAccordionMenu } from "./components/accodeon.js";
import { openBurgerMenu, closeBurgerMenu } from "./components/burger-menu.js";
import { openLocationList, selectLocation } from "./components/location-list.js";
import { initFormValidation } from "./components/validateForm.js";

window.addEventListener('DOMContentLoaded', async () => {
    const data = await getData();

    openBurgerMenu();
    closeBurgerMenu();
    openLocationList();
    selectLocation();
    openAccordionMenu();
    renderSliderList(data);
    initSlider();
    initFilter(data);
    addToCart(data);
    openBasket();
    initFormValidation();
});