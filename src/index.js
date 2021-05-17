import countryCardTmpl from './templates/countryCard.hbs';
import countryListTmpl from './templates/countriesList.hbs';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import './sass/main.scss';

//рефы в отд файл запихнуть
const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchForm: document.querySelector('.text-input'),
};
// добавить коллбек ну хоть дебаунс работает))
refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  // как писать так?
  // const form = e.currentTarget;
  // const searchQuery = form.elements.query.value;
  // или так
  // const form = e.target.value;

  fetchCountries()
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}
// ====== перенесла выше
// fetchCountries().then(renderCountryCard);

// ====== перенесла в отд файл
// function fetchCountries(searchQuery) {
//   return fetch(`https://restcountries.eu/rest/v2/name/{searchQuery}`).then(response => {
//     return response.json();
//   });
// }

// что здесь передавать в функцию?
function renderCountryCard(a) {
  const markUp = countryCardTmpl(a);
  refs.cardContainer.innerHTML = markUp;
}

// const myError = error({
//   text: "I'm an error message.",
// });
