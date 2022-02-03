var apiKey = "ee668b86cfbebe9a187b56c01774d622";
var searchForm = document.querySelector("#search-form");
var searchCity = document.querySelector("#city-name");
var cityResultSection = document.querySelector("#city-result");
var forecastToday = document.querySelector("#forecast");
var forecastWeek = document.querySelector("#forecast-week");

function formSubmit(event) {
  event.preventDefault();
  var cityName =
    searchCity.value.charAt(0).toUpperCase() + searchCity.value.slice(1).trim(); //the value entered by the viewer will always be returned with the first letter being capitalized.
  if (cityName) {
    getWeather(cityName);
    searchCity.value = "";
  } else {
    alert("Please provide a city name!");
  } 
//   if (container) {
//       container.remove();
//   }
}

function getWeather(city) {
  var cityResult = document.createElement("div");
  cityResult.classList.add("card");
  cityResult.innerHTML = `<h3 class='card-header'>Showing forecast for ${city}:</h3>`;
  cityResultSection.appendChild(cityResult);
  var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(cityUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        window.latLonUrl = latLonUrl; 
        displayCurrentForecast(latLonUrl);
        // displayWeekForecast(latLonUrl);
    })
}

function displayCurrentForecast (data) {
    fetch(latLonUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function(data) { 
            console.log(data);
            var container = $("div");
            var card = $("div").addClass("card");
            var header = $("div").addClass("card-header mb-2").html(`<h4>${data.current.dt * 1000}</h4>`);
            var body = $("div").addClass("card-body").html(`<ul class='list-group'><li class='list-group-item'>Temperature: ${data.current.temp}°</li><li class="list-group-item">wind speed: ${(data.current.wind_speed*2.23694).toFixed(2)}mph</li><li class="list-group-item">humidity: ${data.current.humidity}%</li><li class="list-group-item">${data.daily[0].uvi}</li></ul>`);
            card.append(header, body);
            container.append(card);
            forecastToday.append(container);
        });  
}

function displayWeekForecast(data) {
    fetch(latLonUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(data) {
        // console.log(data.daily[i].temp.day, data.daily[i].humidity, data.daily[i].wind_speed, data.daily[i].weather[0].icon, data.daily[i].dt);
        for (var i = 1; i <= 5; i++) {
        var container = $("div");
        var card = $("div").addClass("card");
        var header = $("h4").addClass("card-header").text(data.daily[i].dt*1000);
        var body = $("div").addClass("card-body").html(`<ul class='list-group'><li class="list-group-item">Temperature: ${data.daily[i].temp.day}°</li><li class="list-group-item">wind speed: ${(data.daily[i].wind_speed*2.23694).toFixed(2)}mph</li><li class="list-group-item">humidity: ${data.daily[i].humidity}%</li></ul>`);
        card.append(header, body);
        container.append(card);
        forecastWeek.append(container);
        }
    });
}

searchForm.addEventListener("submit", formSubmit);
