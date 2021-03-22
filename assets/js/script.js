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