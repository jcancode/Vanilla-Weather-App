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

  let newCity = document.querySelector("#city");
  let cityValue = `${cityInput.value}`;
  newCity.innerHTML = `${cityValue}`;
  let apiKey = "a5b335128fba4eofa060ftf6a9c69bc3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&apiid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let cityTemperature = Math.round(response.data.temperature.current);
  console.log(cityTemperature);
  let currentTemperature = document.querySelector("#tempElement");
  currentTemperature.innerHTML = `${cityTemperature}°C`;
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
  newCity.innerHTML = response.data.name;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
