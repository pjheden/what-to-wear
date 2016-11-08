jQuery(document).ready(function($) {
    weather_action();
});

function isMobileUser(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  return false;
}

function weather_action() {
    var weatherPromise = getWeather();
    weatherPromise.then(function(weather) {
            var cels = Math.round(parseFloat(weather.feel) * 100) / 100;
            suggestClothes(cels);
        },
        function(error) {
            console.error(error);
        });
}

//Give cloth  suggestion based on temperature
function suggestClothes(temp) {
    var clothing;
    clothing = getCloth(parseInt(kNearestNeighbours(temp)));
    var response = 'It feels like ' + temp + ' degrees in '+getCity()+', '+getCountry()+', you should wear ' + clothing;
    setResponse(response);
}

//Updates the response p element
function setResponse(val) {
    $("#wear").text(val);
}
