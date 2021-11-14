
import './css/styles.css';
import API from '../src/api-service';
import setBg from '../src/bodyBg'
import Notiflix from 'notiflix';
import  debounce  from 'lodash.debounce';
import countryTpl from '../src/templates/countryContainer.hbs';
import countriesTpl from '../src/templates/countriesList.hbs';

setBg.setBackground('pink','white', '2','40');
const DEBOUNCE_DELAY = 300;
const refs = {
   input: document.querySelector('#search-box'),
   listCountry: document.querySelector('.country-list'),
   container: document.querySelector('.country-info'),
  }

  refs.input.addEventListener('input', debounce(onSearch,  DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const  name = e.target.value.trim();
  
    API.fetchCountries(name)
    .then(function(country) {
      if(country.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
      } else {
        renderCountries(country);
      } 
        renderCountry(country);
    }
    )
    .catch(onError)
  }

function renderCountry(country) {
    if(country.length == 1) {
    const markup = countryTpl(country);
    clearList();
    refs.container.innerHTML = markup;
   }
}

function renderCountries(country) {
  if(country.length <= 10 && country.length >= 2) {
  const markup = countriesTpl(country);
  clearContainer();
  refs.listCountry.innerHTML = markup;
  }
}

function onError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  clearContainer();
  clearList();
}

function clearContainer() {
  refs.container.innerHTML = '';
}
function clearList() {
  refs.listCountry.innerHTML = '';
}