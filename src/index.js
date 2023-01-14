let currentTime = new Date();

function currentInfo(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuestday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day} ${hour}:${minutes}`;
  return formattedDate;
}

let update = document.querySelector("#dayTime");
update.innerHTML = currentInfo(currentTime);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");

  let cityValue = `${cityInput.value}`;
  let newCity = document.querySelector("#city");
  newCity.innerHTML = `${cityValue}`;
  let apiKey = "a5b335128fba4eofa060ftf6a9c69bc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&apiid=${apiKey}`).then(showTemperature);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="info">`;
  let daysForecast = ["Thur", "Fri", "Sat", "Sun", "Mon"];
  daysForecast.forEach(function (daily) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <span class="days"> ${daily}</span>
      <br />
      ☁️
      <br />
      77°F
      <br />
      <span class="low">63°F</span>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(forecast) {
  console.log(forecast);
  let apiKey = "a5b335128fba4eofa060ftf6a9c69bc3";
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=Atlanta&key=${apiKey}`;
  console.log(apiForecastUrl);
  axios.get(apiForecastUrl).then(getForecast);
  getDailyForecast(forecast.daily);
}
function getCoordinates(coordinates) {
  console.log(coordinates);
  let apiKey = "a5b335128fba4eofa060ftf6a9c69bc3";
  let apiCorrdUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiCorrdUrl);
  axios.get(apiCorrdUrl).then(getCoordinates);
}

function showTemperature(response) {
  console.log(response);
  let cityTemperature = Math.round(response.data.temperature.current);
  console.log(cityTemperature);
  let currentTemperature = document.querySelector("#locationTemp");
  currentTemperature.innerHTML = `${cityTemperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  let newCity = document.querySelector("#city");
  newCity.innerHTML = response.data.city;

  celciusTemperature = response.data.temperature.current;

  getCoordinates(response.data.coordinates);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let cityTemperature = document.querySelector("#locationTemp");

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  cityTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityTemperature = document.querySelector("#locationTemp");
  cityTemperature.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

displayForecast();
searchCity("Atlanta");
