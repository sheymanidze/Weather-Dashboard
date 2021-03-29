var placesEl = $('#places');
var searchBtn = $('#searchBtn');
var clearAll = $('#clearAll');
var inputCity = $('#city-Input');
var cityName = $('#cityName');
var key = "a51312ec772d50f8e3864848a74cedc0"


$('#places').on('click', '.list-group-item', function () {
  let clickedCity = ''
  clickedCity = $(this).html();
  console.log(clickedCity)
  var weatherUrl = generateURL(clickedCity);
  currentWeather(weatherUrl);

  weatherForecast(clickedCity);

})


searchBtn.click(function () {

  $('.five-day').show();
  $('#fiveDays').show();
  $('.lead').show();

  //get name and its value
  var cities = $('input[id="city-Input"]').val();

  //refactor url
  var weatherUrl = generateURL(cities);
  currentWeather(weatherUrl)

  weatherForecast(cities);

  //if empty
  if (!cities) {
    console.log("No cities chosen")
    return;
  }

  //print
  placesEl.append('<li>' + cities + '</li>');
  $(placesEl).children().attr("class", "list-group-item")
  $('.list-group').css('visibility', 'visible');
  $('.btn-secondary').css('visibility', 'visible');

  //clear input
  $('input[id="city-Input"]').val('');

  //save at local storage
  localStorage.setItem('places', cities);
  //localStorage.getItem('places', cities);

});

clearAll.click(function () {
  localStorage.clear();
  location.reload(true);
});

function generateURL(cities) {

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities + '&appid=' + key;
  return weatherUrl;
}


function currentWeather(weatherUrl) {

  fetch(weatherUrl, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var currentDate = moment().format('L');

      //Api for icon
      var weatherIcon = data.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';


      $('#cityName').text(data.name + " " + "(" + currentDate + ")");
      $('#iconMain').attr('src', iconUrl);


      var temp = (data.main.temp - 273.15);

      $('#temperature').text('Temperature:  ' + temp.toFixed(0) + ' °C');


      $('#humidity').text('Humidity:  ' + data.main.humidity + "%");


      $('#windSpeed').text('Wind Speed:  ' + data.wind.speed.toFixed(1) + ' MPH');


      var lat = data.coord.lat;
      var lon = data.coord.lon;



      //get UV Index
      var uvIndexUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + key;

      fetch(uvIndexUrl, {
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {


          var coloredIndex = data.value

          $('#uvIndex').text('  ' + coloredIndex);


          if (data.value <= 2) {
            coloredIndex.css('background-color', 'green')
          } else if (data.value <= 5) {
            $('#uvIndex').css('background-color', 'yellow')
          } else if (data.value <= 7) {
            $('#uvIndex').css('background-color', 'orange')
          } else if (data.value <= 10) {
            $('#uvIndex').css('background-color', 'red')
          } else {
            $('#uvIndex').css('background - color', 'purple')
          }

        });



    });

};

//5 days forecast
function weatherForecast(cities) {
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cities + '&units=metric&appid=' + key;

  fetch(forecastUrl, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i = 0; i < 5; i++) {
        var date = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
        var forecastIcon = data.list[((i + 1) * 8) - 1].weather[0].icon;
        var iconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
        var temp = data.list[((i + 1) * 8) - 1].main.temp.toFixed(0);
        var hum = data.list[((i + 1) * 8) - 1].main.humidity;

        $('#fDate' + i).text(date);
        $('#forecastIcon' + i).html('<img src=' + iconUrl + '>');
        $('#temp' + i).text(' ' + temp + ' °C');
        $('#hum' + i).text(' ' + hum + ' %');

      }
    })
}





