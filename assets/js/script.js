var apiKey = "ee668b86cfbebe9a187b56c01774d622";
var searchForm = document.querySelector("#search-form");
var searchCity = document.querySelector("#city-name");
var cityResultSection = document.querySelector("#city-result");
var forecastToday = document.querySelector("#forecast-today");
var forecastWeek = document.querySelector("#forecast-week");
var nameArr = [];
var btnSelect = [];
var cityName = "";
var storedCities = document.querySelector("#stored-cities");

function formSubmit(event) {
  event.preventDefault();
  cityName =
    searchCity.value.charAt(0).toUpperCase() + searchCity.value.slice(1).trim(); //the value entered by the viewer will always be returned with the first letter being capitalized.
  if (cityName) {
    getWeather(cityName);
    searchCity.value = "";
  } else {
    alert("Please provide a city name!");
  }
  if (nameArr.includes(cityName)){
    console.log("city name already exists in local storage");
  } else { //if city name does not already exist in local storage, it will be stored
    nameArr.push(cityName);
    localStorage.setItem("cities", JSON.stringify(nameArr));
  }

  generateCityButtons(nameArr);
}

function generateCityButtons(city) {
  $("#stored-cities").children().remove();
  for (var i = 0; i <= 3; i++) {
    var storedBtn = $("<btn>")
    .attr('id', `stored-btn-submit${+i}`)
      .attr("type", "button")
      .addClass("btn btn-primary mx-2 stored-btn")
      .html(`<span id="stored-btn-${+i}">${city[i]}</span>`)
      .appendTo("#stored-cities");

      if((document.getElementById(`stored-btn-${+i}`).textContent) === 'undefined') {
        storedBtn.addClass('d-none');
      }

      document.querySelector(`#stored-btn-${+i}`).addEventListener("click",function(e) {
        cityName = this.textContent;
        console.log(cityName);
        getWeather(cityName);
      });
    }
}

function getWeather(city) {
  $("#city-result").children().remove();
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
      var date = new Date(data.current.dt * 1000).toLocaleDateString();
      var uvi = data.current.uvi;

      $("#forecast-today").children().remove();
      $("<div>")
        .addClass("col-6")
        .attr("id", "forecast-container")
        .appendTo("#forecast-today");
      $("<div>")
        .addClass("card")
        .attr("id", "forecast-card")
        .appendTo("#forecast-container");
      $("<h3>")
        .addClass("card-header mb-2")
        .html(
          `<img src='https://openweathermap.org/img/w/${data.current.weather[0].icon}.png'></img> <p>${date}</p>`
        )
        .appendTo("#forecast-card");
      $("<h4>")
        .addClass("card-body")
        .attr("id", "card-body-0")
        .html(
          `<ul class='list-group'><li class='list-group-item'>Temperature: ${
            data.current.temp
          }°</li><li class="list-group-item">wind speed: ${data.current.wind_speed.toFixed(
            2
          )}mph</li><li class="list-group-item">humidity: ${
            data.current.humidity
          }%</li><li class="list-group-item" id='uvi-item'>${uvi}</li></ul>`
        )
        .appendTo("#forecast-card");

      if (uvi < 2) {
        document.querySelector("#uvi-item").style.background = "green";
      } else if (uvi > 2 && uvi <= 5) {
        document.querySelector("#uvi-item").style.background = "yellow";
      } else if (uvi > 5 && uvi <= 7) {
        document.querySelector("#uvi-item").style.background = "orange";
      } else if (uvi > 7) {
        document.querySelector("#uvi-item").style.background = "red";
      }
      weekData(data);
    });
}

function weekData(data) {
  $("#forecast-week").children().remove();
  for (var i = 1; i <= 5; i++) {
    console.log(data.daily[1].dt * 1000);
    var icon = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
    var dt = new Date(data.daily[i].dt * 1000).toLocaleDateString();
    var temp = data.daily[i].temp.day;
    var wind = data.daily[i].wind_speed;
    var hum = data.daily[i].humidity;
    displayWeekForecast(i, icon, dt, temp, wind, hum);
  }
}
function displayWeekForecast(i, icon, dt, temp, wind, hum) {
  $("<div>")
    .addClass("col-2")
    .attr("id", "card-container" + i)
    .appendTo("#forecast-week");
  $("<div>")
    .addClass("card")
    .attr("id", "card-" + i)
    .appendTo("#card-container" + i);
  $("<h3>")
    .addClass("card-header mb-2")
    .html(`<img src='${icon}'></img> <p>${dt}</p>`)
    .appendTo("#card-" + i);
  $("<h4>")
    .addClass("card-body")
    .attr("id", "card-body" + i)
    .html(
      `<ul class='list-group'><li class='list-group-item'>Temperature: ${temp}°</li><li class="list-group-item">wind speed: ${wind}mph</li><li class="list-group-item">humidity: ${hum}%</li></ul>`
    )
    .appendTo("#card-" + i);
}

searchForm.addEventListener("submit", formSubmit);