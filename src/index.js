import countryCardTmpl from './templates/countryCard.hbs';
import countryListTmpl from './templates/countriesList.hbs';
import getRefs from './getRefs';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import './sass/main.scss';

//рефы в отд файл запихнуть+
const refs = getRefs();
// добавить коллбек ну хоть дебаунс работает))
refs.searchForm.addEventListener('input', debounce(onSearch, 3000));

function onSearch(e) {
  e.preventDefault();
  // как писать так?
  // const form = e.currentTarget;
  // const searchQuery = form.elements.query.value;
  // или так
  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
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
function renderCountryCard(searchQuery) {
  const markUp = countryCardTmpl(searchQuery);
  refs.cardContainer.innerHTML = markUp;
}

// const myError = error({
//   text: "I'm an error message.",
// });
function onFetchError(error) {
  alert('Хуита вышла');
}
