var apiKey = "ee668b86cfbebe9a187b56c01774d622";
var searchForm = document.querySelector("#search-form");
var searchCity = document.querySelector("#city-name");
var cityResultSection = document.querySelector("#city-result");
var forecastSection = document.querySelector("#forecast");

function formSubmit(event) {
  event.preventDefault();
  var cityName = searchCity.value.trim();
  if (cityName) {
    getWeather(cityName);
    searchCity.value = "";
  } else {
    alert("Please provide a city name!");
  }
}

function getWeather(city) {
    var cityResult = document.createElement("div");
    cityResult.innerHTML = `<h3 class='card-header'>Showing forecast for ${city}:</h3>`;
    cityResultSection.appendChild(cityResult);
  var cityUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(cityUrl)
    .then(function (response) {
      if (response.ok) {
          return response.json();
      }
    })
    .then(function (data) {
    //   console.log(data.coord.lat);
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      var latLonUrl =
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`;
      fetch(latLonUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function (data) {
          for (var i = 0; i < data.length; i++) {
             var container = createElement("div").setClass("card");
             var header = createElement("h4").setClass("card-header").textContent(city);
             var body = createElement("div").setClass("card-body").
             container.appendChild(container, header);
             forecastSection.appendChild(container);
          }
        });
    });
}

searchForm.addEventListener("submit", formSubmit);

// //   // Create weather icon and append to city name element
// //   var iconEl = document.createElement('img');
// //   iconEl.setAttribute('src', iconUrl + curr.weather[0].icon + '.png');
// //   cityNameEl.appendChild(iconEl);
// //   var iconUrl = 'https://openweathermap.org/img/wn/';
