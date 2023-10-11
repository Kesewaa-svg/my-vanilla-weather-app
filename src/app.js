function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAZ9JREFUaN7tmdGNgzAMhhmBERiBEVjgJEbICIyQERiBTS4j5JU3RmCDnHNyq1wE1A4Jl0iJ9KtqVdv/R+xA1cYY05Ssos1XgCwBOGtd1x4kPfVNwhUFAI1rkDmRTgVyGwCMiQvjvkRWAGBoYJh/qc8JQAcAqCwAsO9NoBbQ5n1m38+g9ikAeQPgSjtofAJgTgTw0lg6wE5ppyAAmxj72CTWHB0Ae39/wPzvYEcDwKuuHzL+VkyAx81HA0h4ZKYHwNbZ/wvg4KFQcAFEJub/3Mk5ADJDgPcRWzKAVVc6wFQ6gKQA9EUD4H1AFdtCN3465jHEua8KUCzA1/c6gBbQxikI35cgZV8ZMae1ggAgUWuTgQxqIBqZnBhFjLmsFQognYRWI9HI7sRoxo6d1mIDQILOS0i9kosXNxBiPtYKAVBe0o7Yw27MQoT+WIsFYLfPSyiJRrQTY9uoJcSQapEBDoZpIxqZPCNTwOCe1uIAZDO4oQBbwOAK7uBya3EAFs7gHpwipMHl1uIADLi1XcNYGCOYMeRa9W/WClABKkAFiKofRnoGaQBkK9wAAAAASUVORK5CYII="
                  alt=""
                  width="43"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18° </span>
                  <span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "ca9097db51557e9e4a3a89b4d2f3f110";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Amsterdam");
displayForecast();
