const weatherContainer = document.querySelector('.weather');

const btn = document.querySelector('.btn-city');
// const cityName = prompt('Enter City Name');
const renderCity = function (data) {
  const main = data.main;
  const [weather] = data.weather;
  const desc =
    weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
  const country = data.sys.country;
  console.log(country);

  const min = data.main.temp_min;
  const max = data.main.temp_max;
  const pressure = data.main.pressure;
  console.log(min, max);
  const html = `
  <div class="weatherDetails">
  <p class="cityName">${data.name}<sup>(${country})</sup></p>
  <div class="forecast">
      <span class="temp">${main.temp}<sup>c</sup></span>
      <div class='details'>
        <span class="description">${desc}</span>
        <div class="right">
            <img class='drop' src="images/drop.png"></img>
            <p class='humidity'>${main.humidity}%</p>
        </div>
      </div>
  </div>
  <div class='others'>
    <img src="images/cloud2.png"></img>
    <div class='right2'>
        <span class=''>Min Temp ${min}<sup>c</sup></span>
        <span class=''>Max Temp ${max}<sup>c</sup></span>
        <span class=''>Pressure:${pressure}</span>
    </div>
 </div>
</div> 
      `;
  weatherContainer.insertAdjacentHTML('beforeend', html);
  weatherContainer.style.opacity = 1;
};

const key = '4d8fb5b93d4af21d66a2948710284366';
function getWeather(inputVal) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${key}&units=metric`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);
      console.log(data.name);
      renderCity(data);
      const [weather] = data.weather;
      console.log(weather.description);

      const main = data.main;
      console.log(main.humidity);
    });
}

btn.addEventListener('click', function () {
  const cityName = prompt('Enter City Name');
  getWeather(cityName);
  btn.style.display = 'none';
});
