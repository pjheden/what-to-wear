jQuery(document).ready(function($) {
    weather_action();
    if(isMobileUser()){
      setMobileStyling();
    }else{
      setDesktopStyling();
    }
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
            weather_action();
        });
}

//Give cloth  suggestion based on temperature
function suggestClothes(temp) {
    var clothing;
    var clothInt = parseInt(kNearestNeighbours(temp));
    clothing = getCloth(clothInt);
    var response = 'It feels like ' + temp + ' *C in '+getCity()+', '+getCountry()+', you should wear ' + clothing +'.';
    setResponse(response);
    setClothImg( getClothesImg(clothInt), clothing);
}

//Updates the response p element
function setResponse(val) {
    $("#wear").text(val);
}

function setClothImg(imgPath, imgDesc) {
  $('#clothImg').attr('src', imgPath);
  $('#clothImg').attr('alt', imgDesc);
}

function setMobileStyling() {
  /*


  */
  $('.container').css('width','100%');
  // $('h1, h2, h3, h4').css('font-size', '5vmax');
  // $('p').css('font-size', '1.5vmax');
  // $('button').css('width', '5vmax');
  // $('button').css('height', '5vmax');
  // $('input, select').css('width', '20vmax');
  // $('input, select').css('height', '5vmax');
  // $('input, select').css('font-size', '1.5vmax');

  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", "styles/mobile.css");
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

function setDesktopStyling(){
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", "styles/desktop.css");
  document.getElementsByTagName("head")[0].appendChild(fileref);
}
