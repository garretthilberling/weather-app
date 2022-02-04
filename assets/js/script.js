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
      //   console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      displayCurrentForecast(latLonUrl);
      //
    });
}

function displayCurrentForecast(url) {
  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      // console.log(data);
      var currentDate = new Date(data.daily[0].dt * 1000);
      // console.log(currentDate);
      var container = $("div").addClass("col-2");
      window.container = container;
      var card = $("div").addClass("card");
      var header = $("h3")
        .addClass("card-header mb-2")
        .html(
          `<img src='${data.current.weather[0].icon}'></img> <h4>${currentDate}</h4>`
        );
      var body = $("div")
        .addClass("card-body")
        .html(
          `<ul class='list-group'><li class='list-group-item'>Temperature: ${
            data.current.temp
          }°</li><li class="list-group-item">wind speed: ${(
            data.current.wind_speed * 2.23694
          ).toFixed(2)}mph</li><li class="list-group-item">humidity: ${
            data.current.humidity
          }%</li><li class="list-group-item">${data.daily[0].uvi}</li></ul>`
        );
      card.append(header);
      card.append(body);
      container.append(card);
      forecastToday.append(container);

      var weekData = data;
      displayWeekForecast(data);
    });
}

function displayWeekForecast(data) {
  for (var i = 1; i <= 5; i++) {
    console.log(data.daily[i]);
    //   console.log(icon);
    var icon = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
    var dt = new Date(data.daily[i].dt * 1000);
    var temp = data.daily[i].temp.day;
    var wind = data.daily[i].wind_speed * 1000;
    var hum = data.daily[i].humidity;

    var container = $("div").addClass("col-2");
    var card = $("div").addClass("card");
    var header = $("h3")
      .addClass("card-header mb-2")
      .html(`<img src='${icon}'></img> <p>${dt}</p>`);
    var body = $("div")
      .addClass("card-body")
      .html(
        `<ul class='list-group'><li class='list-group-item'>Temperature: ${temp}°</li><li class="list-group-item">wind speed: ${wind}mph</li><li class="list-group-item">humidity: ${hum}%</li></ul>`
      );
  }
  card.append(header);
  card.append(body);
  container.append(card);
  forecastToday.append(container);
}

searchForm.addEventListener("submit", formSubmit);
