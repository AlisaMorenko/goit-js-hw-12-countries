import countryCardTmpl from './templates/countryCard.hbs';
import countryListTmpl from './templates/countriesList.hbs';
import getRefs from './getRefs';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import './sass/main.scss';

const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  resetPage();
  const searchQuery = e.target.value;
  API.fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length === 1) {
        renderCountryCard(countries);
      } else if (countries.length <= 10) {
        renderCountriesList(countries);
      } else if (countries.length > 10) {
        error({
          text: 'Too many matches found! Please enter a more spesific query!',
          delay: 2000,
        });
      }
    })
    .catch(error => resetPage(error));
}

function renderCountryCard(searchQuery) {
  const markUp = countryCardTmpl(searchQuery);
  refs.cardContainer.innerHTML = markUp;
}
function renderCountriesList(searchQuery) {
  const markUp = countryListTmpl(searchQuery);
  refs.cardContainer.innerHTML = markUp;
}

function resetPage() {
  refs.cardContainer.innerHTML = '';
}
