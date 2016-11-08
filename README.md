# What-To-Wear
HTML5 webApp that eventually will suggest clothing to wear depending on the weather outside.
The thought is that the app will require training, since each user is different.
Thus, you will input what you wore and if you were cold/warm for a few days and then the program can make suggestions.

## Usage
Register at API.AI and Weather Underground for api keys.
Then create ./js/keys.js and add the following text:

function getAiKey(){
  return your_api_key;
}

function getWeatherKey(){
  return your_weather_key;
}

## Libraries
Using API.AI for Natrual Language processing: https://api.ai/

HTML5 webkitSpeechRecognition for STT: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

Weather Underground for weather: https://www.wunderground.com/?apiref=c9efedbf428785a3

CSS cards: http://www.w3schools.com/w3css/w3css_cards.asp

## Future work

### To do, priority

### To do
0. Add special warnings for downfall, i.e. snow/rain/hail
2. Allow for custom names clothes, potentially add levels
3. Sort training data by temperature
4. Add weather visuals
5. Make mobile friendly
6. Remove AI & input and just show what to wear (boring)
  1. Cancel mic recording by clicking the button again
7. Make save button yellow upon any changes to suggest unsaved changes
