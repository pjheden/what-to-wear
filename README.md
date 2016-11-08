# What-To-Wear
HTML5 webApp that eventually will suggest clothing to wear depending on the weather outside.
The thought is that the app will require training, since each user is different.
Thus, you will input what you wore and if you were cold/warm for a few days and then the program can make suggestions.

## Usage
Register at and Weather Underground for an api key.
Then create ./js/keys.js and add the following text:

function getAiKey(){
  return your_api_key;
}

function getWeatherKey(){
  return your_weather_key;
}

## Libraries

HTML5 webkitSpeechRecognition for STT: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

Weather Underground for weather: https://www.wunderground.com/?apiref=c9efedbf428785a3

CSS cards: http://www.w3schools.com/w3css/w3css_cards.asp

## Future work

0. Add special warnings for downfall, i.e. snow/rain/hail
2. Allow for custom names clothes, potentially add levels
3. Sort training data by temperature
4. Add weather visuals
5. Make mobile friendly
7. Make save button yellow upon any changes to suggest unsaved changes
