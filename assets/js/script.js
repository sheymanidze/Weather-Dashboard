var placesEl = $('#places');
var searchBtn = $('#searchBtn');
var clearAll = $('#clearAll');
var inputCity = $('#city-Input');
//var place = "";
var cityName = $('#cityName');
var key = "a51312ec772d50f8e3864848a74cedc0"


$('#places').on('click', '.list-group-item', function () {
  //console.log($(this))
  let clickedCity = ''
  clickedCity = $(this).html();
  console.log(clickedCity)
  var weatherUrl = generateURL(clickedCity);
  currentWeather(weatherUrl)
  //console.log(currentWeather)
  //console.log("Hello")
})


searchBtn.click(function () {

  //get name and its value
  var cities = $('input[id="city-Input"]').val();
  // console.log(cities)

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
  // console.log($(placesEl))



  //clear input
  $('input[id="city-Input"]').val('');

  //save at local storage
  localStorage.setItem('places', cities);
  localStorage.getItem('places', cities);

});

clearAll.click(function () {
  localStorage.clear();
  location.reload(true);
});

function generateURL(cities) {
  //var key = "a51312ec772d50f8e3864848a74cedc0";
  // console.log(key);

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities + '&appid=' + key;
  // console.log(weatherUrl);
  return weatherUrl;
}

// function showWeather(event) {
//   event.preventDefault();

//   if (inputCity.val() !== "") {
//     place = inputCity.value();
//     currentWeather(place);
//     //console.log(currentWeather);
//   }
// };

function currentWeather(weatherUrl) {

  fetch(weatherUrl, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      // console.log(data.name);
      // console.log(data.main.temp);
      // console.log(data.wind.speed);


      var currentDate = moment().format('L');
      //console.log(currentDate)


      //Api for icon
      var weatherIcon = data.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
      // console.log(weatherIcon);
      // console.log(iconUrl);


      $('#cityName').text(data.name + " " + "(" + currentDate + ")");
      $('#iconMain').attr('src', iconUrl)
      // console.log(cityName);

      var temp = (data.main.temp - 273.15);
      //console.log(temp)
      $('#temperature').text('Temperature:  ' + temp.toFixed(0) + ' °C');
      //console.log(temperature);

      $('#humidity').text('Humidity:  ' + data.main.humidity + "%");
      //console.log(humidity);

      $('#windSpeed').text('Wind Speed:  ' + data.wind.speed.toFixed(1) + ' MPH');
      //console.log(windSpeed);

      //var key = "a51312ec772d50f8e3864848a74cedc0";
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      // console.log(lat);
      // console.log(lon);


      //get UV Index
      var uvIndexUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + key;
      //console.log(uvIndexUrl);

      fetch(uvIndexUrl, {
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //console.log(data.value);

          var coloredIndex = data.value

          $('#uvIndex').text('UV Index:  ' + coloredIndex);
          // console.log(uvIndex)

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

function weatherForecast(cities) {
  var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cities + '&units=metric&appid=' + key;
  console.log(forecastUrl)

  fetch(forecastUrl, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (i = 0; i < 5; i++) {
        // var currentDate = moment().format('L');
        // var fDate = moment(currentDate).add(((i + 1) * 8) - 1).format('L')
        //console.log(fDate)
        var forecastIcon = data.list[((i + 1) * 8) - 1].weather[0].icon;
        console.log(forecastIcon)
        var iconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
        console.log(iconUrl)
        var temp = data.list[((i + 1) * 8) - 1].main.temp.toFixed(0);
        console.log(temp)
        var hum = data.list[((i + 1) * 8) - 1].main.humidity;
        console.log(hum)

        $('#fDate')
        $('#forecastIcon' + i).html('<img src=' + iconUrl + '>');
        $('#temp' + i).text(temp + ' °C');
        $('#hum' + i).text(hum + ' %');

      }
    })
}





