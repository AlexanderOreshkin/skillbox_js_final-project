import { setSelectedCity } from "./filter.js";

const locationBtn = document.querySelector('.location__city')

export function openLocationList() {
    locationBtn.addEventListener('click', () => {
        locationBtn.classList.toggle('location__city--active')
    })
} 

const locationCities = document.querySelectorAll('.location__sublink')
const cityNameEl = document.querySelector('.location__city-name')

export function selectLocation() {
locationCities.forEach(element => {
    element.addEventListener('click', () =>{
        const cityName = element.textContent;
        cityNameEl.textContent = cityName;
        locationBtn.classList.remove('location__city--active')
        if (cityName === "Оренбург") {
            cityNameEl.id = "orenburg"
        } else if(cityName === "Москва") {
            cityNameEl.id = "moscow"
        } else {
            cityNameEl.id = "saintPetersburg"
        }
        setSelectedCity(cityNameEl.id);
    })
});
}

