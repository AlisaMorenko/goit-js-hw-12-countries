import './sass/main.scss';
import countryCardTmpl from './templates/countryCard.hbs';
import countryListTmpl from './templates/countryList.hbs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
};

fetchCountry().then(renderCountryCard);
// .catch (error => {
//     console.log(error);
// });

function fetchCountry() {
  return fetch('https://restcountries.eu/rest/v2/name/afganistan').then(response => {
    return response.json;
  });
}

function renderCountryCard(a) {
  const markUp = countryCardTmpl(a);
  refs.cardContainer.innerHTML = markUp;
}
