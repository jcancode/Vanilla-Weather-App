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

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityValue = `${cityInput.value}`;
  let newCity = document.querySelector("#city");
  newCity.innerHTML = `${cityValue}`;
  searchCity(cityValue);
}

function searchCity(city) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&apiid=${apiKey}`).then(showTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src=${forecastDay.condition.icon_url}
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
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
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiCorrdUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  console.log(apiCorrdUrl);
  axios.get(apiCorrdUrl).then(displayForecast);
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
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

// displayForecast();
searchCity("Atlanta");
