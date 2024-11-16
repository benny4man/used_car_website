import { usedCars } from "./usedCars.js";

const yearsFilter = document.querySelector(".year");
const makeFilter = document.querySelector(".make");
const mileageFilter = document.querySelector(".mileage");
const priceFilter = document.querySelector(".price");
const colorFilter = document.querySelector(".color");
const applyButton = document.querySelector(".filter_button");
let minYear = yearsFilter.querySelector("#min_year");
let maxYear = yearsFilter.querySelector("#max_year");

let years = usedCars.map(({ year }) => year).sort((a, b) => a - b);
let miles = usedCars.map(({ mileage }) => mileage).sort((a, b) => a - b);
let prices = usedCars.map(({ price }) => price).sort((a, b) => a - b);
let makes = usedCars.map(({ make }) => make).sort();
let colors = usedCars.map(({ color }) => color).sort();

years = [...new Set(years)];
miles = [...new Set(miles)];
prices = [...new Set(prices)];
makes = [...new Set(makes)];
colors = [...new Set(colors)];

const createFilters = () => {
    //dynamically creating filter based on data available
    //year filter
    years.forEach((element) => {
        let html = `
    <option value="${element}">${element}</option>
    `;
        minYear.innerHTML += html;
        maxYear.innerHTML += html;
    });

    // make filter
    makes.forEach((element) => {
        let html = `
    <div class="${element}_div">
        <input type="checkbox" name="make" id="make_${element}" value="${element}" />
        <label for="make_${element}">${element}</label>
    </div>
    `;
        makeFilter.innerHTML += html;
    });

    // miles filter
    let maxMiles = miles.at(-1);
    let html = `
  <input placeholder="${maxMiles}" type="number" name="mileage_box" id="mileage_box" />
  `;
    mileageFilter.innerHTML += html;

    // price filter
    let maxPrice = prices.at(-1);
    html = `
  <input placeholder="${maxPrice}" type="number" name="price_box" id="price_box" />
  `;
    priceFilter.innerHTML += html;

    // color filter
    colors.forEach((element) => {
        let html = `
    <div class="${element}_div">
        <input type="checkbox" name="color" id="color_${element}" value="${element}" />
        <label for="color_${element}">${element}</label>
    </div>
    `;
        colorFilter.innerHTML += html;
    });
    maxYear.value = years.at(-1);
};

const filterAndDisplay = () => {
    // getting values of selected filters
    const selectedMakes = Array.from(
        document.querySelectorAll("input[name='make']:checked")
    ).map((checkbox) => checkbox.value);
    const selectedColors = Array.from(
        document.querySelectorAll("input[name='color']:checked")
    ).map((checkbox) => checkbox.value);
    const selectedPrice = document.querySelector("#price_box");
    const selectedMiles = document.querySelector("#mileage_box");
    const carResults = document.querySelector(".cars");

    let filteredResults = usedCars;

    // filtering to narrow down results
    filteredResults = filteredResults.filter(
        (car) => car.year >= minYear.value && car.year <= maxYear.value
    );
    if (selectedPrice.value != "") {
        filteredResults = filteredResults.filter(
            (car) => car.price <= Number(selectedPrice.value)
        );
    }
    if (selectedMiles.value != "") {
        filteredResults = filteredResults.filter(
            (car) => car.mileage <= Number(selectedMiles.value)
        );
    }
    // filteredResults = filteredResults.filter((car) => car.price);
    if (selectedMakes.length > 0) {
        filteredResults = filteredResults.filter((car) =>
            selectedMakes.includes(car.make)
        );
    }

    if (selectedColors.length > 0) {
        filteredResults = filteredResults.filter((car) =>
            selectedColors.includes(car.color)
        );
    }


    // building the html for the cards then applying it
    if (filteredResults.length > 0) {
        carResults.innerHTML = "";
        let carCards = "";
        for (let car of filteredResults) {
            let { year, make, model, color, mileage, price, gasMileage } =
                car;
            let carCard = `
                <div class="car_card">
                    <h1>${make} ${model}</h1>
                    <h2>${year}</h2>
                    <p>Color: ${color}</p>
                    <p>Miles: ${mileage}</p>
                    <p>${gasMileage}</p>
                    <p class="car_price">$${price}</p>
                    <button>View</button>
                </div>
                `;
            carCards += carCard;
        }
        carResults.innerHTML += carCards;
    }else{
        carResults.innerHTML = `<p class="empty_msg">No results found</p>`
    }
    console.log(carResults);
};

createFilters();
filterAndDisplay();
applyButton.addEventListener("click", () => filterAndDisplay());
