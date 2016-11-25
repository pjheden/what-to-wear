# What-To-Wear
HTML5 webApp that eventually will suggest clothing to wear depending on the weather outside.
The thought is that the app will require training, since each user is different.
Thus, you will input what you wore and if you were cold/warm for a few days and then the program can make suggestions.

## Usage
Register at and Weather Underground for an api key.
Then create ./js/keys.js and add the following text:

function getWeatherKey(){
  return your_weather_key;
}

## Libraries

Weather Underground for weather: https://www.wunderground.com/?apiref=c9efedbf428785a3

CSS cards: http://www.w3schools.com/w3css/w3css_cards.asp

## Future work

2. Add special warnings for downfall, i.e. snow/rain/hail

3. Make save button yellow upon any changes to suggest unsaved changes

## Bugfixes

1. Delede training data is not working after storage-rework
