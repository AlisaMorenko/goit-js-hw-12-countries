import countryCardTmpl from './templates/countryCard.hbs';
import countryListTmpl from './templates/countriesList.hbs';
import getRefs from './getRefs';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import './sass/main.scss';

const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.value;
  // сделать, чтобы значение скидывалось после удаления запроса

  API.fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length === 1) {
        renderCountryCard(countries);
      } else if (countries.length <= 10) {
        renderCountriesList(countries);
      } else if (countries.length > 10) {
        error({
          text: 'Too many matches found! Please enter a more spesific query!',
        });
      }
    })
    .catch
    // alert({
    //   text: 'No country found! Please enter another request!',
    // }),
    ();
  // API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
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
  cardContainer.innerHTML = '';
}
