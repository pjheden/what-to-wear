
jQuery(document).ready(function($) {
    // var weather = getRandomWeather();
    // var cels = Math.round( parseFloat(weather) * 100) / 100;
    // $('#celcius').text(cels);

    var text = "What should I wear?"; //default query
    $("#input").val(text);

    setup();
    api_ai();

});

var recognition;
function startRecognition(){
  recognition = new webkitSpeechRecognition();
  recognition.onstart = function(event) {
    $('#mic').toggleClass('btn-info', false);
    $('#mic').toggleClass('btn-warning', true);
  };
  recognition.onresult = function(event) {
    var text = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        text += event.results[i][0].transcript;
        console.log('mic confidence: ', event.results[i][0].confidence);
      }
    $('#input').val(text);
    stopRecognition();
    api_ai();

  };
  recognition.onend = function() {
    stopRecognition();
  };
  recognition.lang = "en-US";
  recognition.start();
}

function switchRecognition() {
  if (recognition) {
    stopRecognition();
  } else {
    startRecognition();
  }
}

function stopRecognition() {
  if (recognition) {
    $('#mic').toggleClass('btn-info', true);
    $('#mic').toggleClass('btn-warning', false);
    recognition.stop();
    recognition = null;
  }
}

//voice response
function voiceResponse(text){
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[10]; // Note: some voices don't support altering params
  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 2; //0 to 2
  msg.text = text;
  msg.lang = 'en-US';
  speechSynthesis.speak(msg);
}

//Setup function
function setup(){
  //Make input field dynamic
  $('input[type="text"]')
      .keyup(resizeInput)// event handler
      .each(resizeInput);// resize on page load

  //keylistener (enter)
  $('#input').keypress(function(e){
      if (e.which == 13){
          api_ai();
      }
  });
}

//Dynamic input field
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}

//Call function depending on action
function triggerAction(action){
  switch (action)
  {
      case "weather-action":
        var weather = getRandomWeather();
        var cels = Math.round( parseFloat(weather) * 100) / 100;
        suggestClothes(cels);
      break;
      case "user-information":
      break;
      case "temperature-training":
      break;
      default:
      console.log('unsuported action', action);
      break;
  }
}

//Give cloth  suggestion based on temperature
function suggestClothes(temp){
  var clothing;
  //Is to be replaced with ML technique
  if(temp > 20){
    clothing = 'preferably nothing';
  }else if(temp > 10){
    clothing = 'something light, a t-shirt';
  }else if(temp > 5){
    clothing = 'a sweater of course';
  }else if(temp > 0){
    clothing = ' a jacket, that will do!';
  }else if(temp > -5){
    clothing = 'a jacket, hat and a scarf';
  }else{
    clothing = ' everything you got!';
  }
  var response = 'It is ' + temp + '*C outside, you should wear ' + clothing;
  voiceResponse(response);
  $('#wear').text(response);
}

//Returns random weather
function getRandomWeather() {
    return getRandomArbitrary(-20, 30);
}

//Returns random number from min, max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Calls api.ai with text from input field
function api_ai(){
  var baseUrl = "https://api.api.ai/v1/";
  var accessToken = "8f0185b6409b4e6c80908067211cc560"; //client token
  var text = $("#input").val();
  //var lang = "en-US";
  request(baseUrl, accessToken, text);
  setResponse('loading ... ');
}

//make a request to baseUrl with accessToken and given text
function request(baseUrl, accessToken, text){
  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({ q: text, lang: "en" }),
    success: function(data) {
      $('#action').text('action: ' +  data.result.action);
      $('#json').text('action: ' +  JSON.stringify(data, null, 2));
      triggerAction(data.result.action);
      setResponse('Output: ' + JSON.stringify(data.result.fulfillment.speech, undefined, 2));
    },
    error: function() {
      setResponse("Internal Server Error");
    }
  });
}

//Updates the response p element
function setResponse(val) {
  $("#response").text(val);
}


//TEMP UNUSEd and not funcitonal
 function getAutoCompleteValues() {
     var apiKey = "HnO9QoL2n5nownET8nROzJkvNh8AZ1aA";
     var locationUrl = "http://apidev.accuweather.com/locations/v1/search?q=" + "Stockholm, Sweden" + "&apikey=" + apiKey;
     console.log(locationUrl);
     $.ajax({
         type: "GET",
         url: locationUrl,
         dataType: "jsonp",
         cache: true,                    // Use cache for better reponse times
         jsonpCallback: "awxCallback",   // Prevent unique callback name for better reponse times
         success: function (data) { console.log(data); },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
           console.log("error!");
           alert("Status: " + textStatus); alert("Error: " + errorThrown);
          }
     });
}
