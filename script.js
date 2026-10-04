const apiKey = "D848a0262b31684cdffdc8fc98e332b5";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const resultBox = document.getElementById("result");

searchBtn.addEventListener("click", function () {
  const city = cityInput.value;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.cod === 200) {
        const temperature = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const iconCode = data.weather[0].icon;
        const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        const now = new Date();
        const updatedTime = now.toLocaleTimeString();

        resultBox.innerHTML =
          "<img src='" + iconUrl + "' alt=''>" +
          "<h2>" + data.name + "</h2>" +
          "<p>" + temperature + "°C — " + condition + "</p>" +
          "<div class='stats'>" +
            "<div><div class='stat-value'>" + humidity + "%</div><div class='stat-label'>Humidity</div></div>" +
            "<div><div class='stat-value'>" + wind + " km/h</div><div class='stat-label'>Wind Speed</div></div>" +
          "</div>" +
          "<p class='updated'>Last updated: " + updatedTime + "</p>";
      } else {
        resultBox.innerHTML = "<p class='error'>City not found. Check the spelling and try again.</p>";
      }
    });
});