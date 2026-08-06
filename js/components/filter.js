import { renderProductList } from "./renderCard.js";
import { sortProducts } from "./sortProducts.js";
import { addToCart, setProductsData } from "./basket.js";

let selectedCity = 'orenburg';
let selectedTypes = [];
let showOnlyInStock = false;
let allProducts = [];
let currentSort = 'price-min';
let currentPage = 1;
const cardsPerPage = 6;

export function initFilter(data) {
    allProducts = data;
    setProductsData(data);

    window.onPageChange = (page) => {
        currentPage = page;
        applyFilters();
        const catalogList = document.querySelector('.catalog__list');
        if (catalogList) {
            catalogList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    setupFilterListeners();
    setupSortListener();

    applyFilters();
}

export function setSelectedCity(city) {
    selectedCity = city;
    currentPage = 1;
    applyFilters();
}

function setupSortListener() {
    const sortSelect = document.querySelector('.catalog__sort-select');
  
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            applyFilters();
        });
    
}

function setupFilterListeners() {
    const instockRadio = document.getElementById('instock');
  
        instockRadio.addEventListener('change', () => {
            showOnlyInStock = true;
            currentPage = 1;
            applyFilters();
        });
    
    
    const allItemRadio = document.getElementById('all-item');
   
        allItemRadio.addEventListener('change', () => {
            showOnlyInStock = false;
            currentPage = 1;
            applyFilters();
        });
    
    
    const typeCheckboxes = document.querySelectorAll('.custom-checkbox__field[name="type"]');
    typeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateSelectedTypes();
            currentPage = 1;
            applyFilters();
        });
    });
    
    const resetBtn = document.querySelector('.catalog-form__reset');
   
        resetBtn.addEventListener('click', () => {
            resetFilters();
            currentPage = 1;
            applyFilters();
        });
    
}

function updateSelectedTypes() {
    selectedTypes = [];
    const checkedCheckboxes = document.querySelectorAll('.custom-checkbox__field[name="type"]:checked');
    checkedCheckboxes.forEach(checkbox => {
        selectedTypes.push(checkbox.value);
    });
}

function resetFilters() {
    const typeCheckboxes = document.querySelectorAll('.custom-checkbox__field[name="type"]');
    typeCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    const allItemRadio = document.getElementById('all-item');
    if (allItemRadio) {
        allItemRadio.checked = true;
    }

    const sortSelect = document.querySelector('.catalog__sort-select');
    if (sortSelect) {
        sortSelect.value = 'price-min';
        currentSort = 'price-min';
    }
    
    selectedTypes = [];
    showOnlyInStock = false;
}

function applyFilters() {
    let filteredProducts = [...allProducts];
    
    if (showOnlyInStock) {
        filteredProducts = filteredProducts.filter(product => {
            const cityAvailability = product.availability?.[selectedCity];
            return cityAvailability && cityAvailability > 0;
        });
    }
    
    if (selectedTypes.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return product.type?.some(type => selectedTypes.includes(type));
        });
    }
    
    filteredProducts = sortProducts(filteredProducts, currentSort);

    updateCheckboxCounters(filteredProducts);
    renderProductList(filteredProducts, currentPage, cardsPerPage);
    addToCart(allProducts);
}

function updateCheckboxCounters(filteredProducts) {
    let baseProducts = allProducts.filter(product => {
        const cityAvailability = product.availability?.[selectedCity];
        return cityAvailability && cityAvailability > 0;
    });
    
    if (showOnlyInStock) {
        baseProducts = filteredProducts;
    }
    
    const counts = baseProducts.reduce((acc, item) => {
        item.type?.forEach(type => {
            acc[type] = (acc[type] || 0) + 1;
        });
        return acc;
    }, {});
    
    const checkboxElems = document.querySelectorAll('.custom-checkbox__field[name="type"]');
    checkboxElems.forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        if (label) {
            let countElement = label.querySelector('.custom-checkbox__count');
            if (!countElement) {
                countElement = document.createElement('span');
                countElement.classList.add('custom-checkbox__count');
                label.appendChild(countElement);
            }
            countElement.textContent = counts[checkbox.value] || '0';
        }
    });
}