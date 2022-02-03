var apiKey = "ee668b86cfbebe9a187b56c01774d622";
var searchForm = document.querySelector("#search-form");
var searchCity = document.querySelector("#city-name");
var cityResultSection = document.querySelector("#city-result");
var forecastSection = document.querySelector("#forecast");

function formSubmit(event) {
  event.preventDefault();
  var cityName = searchCity.value.charAt(0).toUpperCase() + searchCity.value.slice(1).trim(); //the value entered by the viewer will always be returned with the first letter being capitalized.
  if (cityName) {
    getWeather(cityName);
    searchCity.value = "";
  } else {
    alert("Please provide a city name!");
  }
}

function getWeather(city) {
    var cityResult = document.createElement("div");
    cityResult.classList.add("card");
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
        .then(function (list) {
            //   for (var i = 0; i < data.length; i++) {
            var temp = list.temp.day;
            var wind = list.speed;
            var humidity = list.humidity;
            // var uvIndex = data.current.uvi;
             var container = document.createElement("div");
             container.classList.add("card");
             var header = document.createElement("h4");
             header.classList.add("card-header");
             header.textContent = city;
             container.appendChild(header);
             var body = document.createElement("div");
             body.classList.add("card-body");
             body.textContent = `<ul><li>Temp: ${temp}</li> <li>wind: ${wind}</li> <li>humidity:${humidity} `;


             container.appendChild(body);
             forecastSection.appendChild(container);
        //   }
        });
    });
}

searchForm.addEventListener("submit", formSubmit);

// //   // Create weather icon and append to city name element
// //   var iconEl = document.createElement('img');
// //   iconEl.setAttribute('src', iconUrl + curr.weather[0].icon + '.png');
// //   cityNameEl.appendChild(iconEl);
// //   var iconUrl = 'https://openweathermap.org/img/wn/';
