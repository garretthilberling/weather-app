var apiKey = 'ee668b86cfbebe9a187b56c01774d622';
// var cityUrl = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=orlando&appid=${apiKey}`
fetch(cityUrl).then(function(response){
    if (response.ok) {
        response.json();
        // console.log(response.json());
    }
}).then(function (data) {
    // console.log(data.coord.lat);
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    var latLonUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`;
    fetch(latLonUrl).then(function (response) {
        if (response.ok) {
            return response.json();
            
        }
    }).then(function (data) {
        console.table(data.current);
        var {temp, uvi} = data.current;
        random({temp, uvi});
    });
});
function random(data) {
    console.log(data);
}