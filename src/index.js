import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt){
  let inputValue = evt.target.value.trim();
if(!inputValue){
  list.innerHTML= '';
  return;
}

fetchCountries(inputValue)
.then(resp =>{
  
  if(resp.length === 1){
    list.innerHTML =  countryMarkup(resp);
    return;
  }
  if(resp.length >= 2 && resp.length <= 10){
    list.innerHTML = countryListMarkup(resp);
    return;
  }
if(resp.length > 10){
  return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}
})
.catch(err => {
  console.log(err);
  Notiflix.Notify.failure('Oops, there is no country with that name');
  list.innerHTML = '';
  return
});
}

function countryListMarkup(arr){
return arr
.map(({ name, flags}) =>{
  return `<li>
  <img src="${flags.svg}" alt="flag" width='140px' height="auto"</img>
    <p class="name_title">${name.official}</p>
  </li>`;
})
.join('');
}

function countryMarkup(arr){
return arr
.map(({ name, flags, capital, population, languages}) => {
  const langs = Object.values(languages).join(', ');

  return `<li>
  <div>
    <img src="${flags.svg}" alt="flag" width='80px' height="auto"</img>
    <h2>${name.official}</h2>
  </div>
  <p><span class="name_title">Capital: </span>${capital}</p>
  <p><span class="name_title">Population: </span>${population}</p>
  <p><span class="name_title">Languages: </span>${langs}</p>
</li>`;
})
.join('');
}
