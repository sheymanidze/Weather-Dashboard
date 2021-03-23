var placesEl = $('#places');
var searchBtn = $('#searchBtn');
var clearAll = $('#clearAll');



searchBtn.click(function () {

  //get name and its value
  var cities = $('input[id="city-Input"]').val();
  console.log(cities)


  //if empty
  if (!cities) {
    console.log("No cities chosen")
    return;
  }

  //print
  placesEl.append('<li>' + cities + '</li>');
  $(placesEl).attr("class", "list-group-item")
  $('.list-group').css('visibility', 'visible');
  $('.btn-secondary').css('visibility', 'visible');
  console.log($(placesEl))


  //clear input
  $('input[id="city-Input"]').val('');

  //save at local storage
  localStorage.setItem('places', cities);

});

clearAll.click(function () {
  localStorage.clear();
  location.reload(true);
});

//API key
var key = "a51312ec772d50f8e3864848a74cedc0";
console.log(key);

var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=&appid={a51312ec772d50f8e3864848a74cedc0}";

console.log(weatherUrl);

function showWeather(event) {
  event.preventDefault();
}

fetch('https://api.openweathermap.org/data/2.5/weather?q=&appid={a51312ec772d50f8e3864848a74cedc0}', {
  method: 'GET',
  url: weatherUrl
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })