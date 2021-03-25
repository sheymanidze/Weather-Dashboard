var placesEl = $('#places');
var searchBtn = $('#searchBtn');
var clearAll = $('#clearAll');
var inputCity = $('#city-Input');
var place = "";
var cityName = $('#cityName');
var currentDate = $('#date');
var temperature = $('#temperature');




searchBtn.click(function () {

  //get name and its value
  var cities = $('input[id="city-Input"]').val();
  // console.log(cities)

  //refactor url
  var weatherUrl = generateURL(cities);
  currentWeather(weatherUrl)

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

  $('.list-group-item').click(function () {
    //console.log($(this))
    var clickedCity = $(this).html();
    console.log(clickedCity)
    currentWeather(weatherUrl)
    // console.log(currentWeather)
    // console.log("Hello")
  })

  var currentDate = moment().format('L');
  $('#data').text(currentDate)




  //clear input
  $('input[id="city-Input"]').val('');

  //save at local storage
  localStorage.setItem('places', cities);

});

clearAll.click(function () {
  localStorage.clear();
  location.reload(true);
});

function generateURL(cities) {
  var key = "a51312ec772d50f8e3864848a74cedc0";
  // console.log(key);

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities + '&appid=' + key;
  // console.log(weatherUrl);
  return weatherUrl;
}

function showWeather(event) {
  event.preventDefault();

  if (inputCity.val() !== "") {
    place = inputCity.value();
    currentWeather(place);
    //console.log(currentWeather);
  }
};

function currentWeather(weatherUrl) {

  fetch(weatherUrl, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // console.log(data.name);
      console.log(data.main.temp);
      console.log(data.wind.speed);


      //Api for icon
      var weatherIcon = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      console.log(weatherIcon);
      console.log(iconUrl);


      $('#cityName').text(data.name + " <img src=" + iconUrl + ">");
      // console.log(cityName);

      var temp = (data.main.temp - 273.15);
      console.log(temp)
      $('#temperature').text('Temperature: ' + temp.toFixed(0) + ' °C');
      console.log(temperature);

      $('#humidity').text('Humidity: ' + data.main.humidity + "%");
      console.log(humidity);

      $('#windSpeed').text('Wind Speed: ' + data.wind.speed + ' MPH');


    })
  console.log(currentWeather);


}



