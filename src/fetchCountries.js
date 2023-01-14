const BAZE_URL = 'https://restcountries.com/v3.1'; 

function fetchCountries(name) {
  fetch('${BAZE_URL}/name/{name}?fields=name,capital,population,flags,languages'
  ).then(response)
}