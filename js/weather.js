var apiKey = '60be2003867989ab';
var baseUrl = 'http://api.wunderground.com/api/';

function getWeather() {
    console.log('Weather test');
    var weatherPromise = fetchWeather();
    weatherPromise.then(function(weather) {
        console.log(weather.real);
        console.log(weather.feel);
    }, function(error) {
        console.error('Error, could not fetch the weather', error);
    });
}

//Returns random weather
function getRandomWeather() {
    return getRandomArbitrary(-5, 25);
}

//Returns random number from min, max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function fetchWeather() {
    var promise = new Promise(
        function(resolve, reject) {
            $.ajax({
                url: baseUrl + apiKey + "/geolookup/conditions/q/IA/Cedar_Rapids.json",
                dataType: "jsonp",
                success: function(parsed_json) {
                    console.log(parsed_json);
                    var temp = {
                      real: undefined,
                      feel: undefined
                    };
                    temp.real = parsed_json['current_observation']['temp_c'];
                    temp.feel = parsed_json['current_observation']['feelslike_c'];
                    resolve(temp);
                },
                error: function() {
                  reject('Error, weather request timed out');
                }
            });
        }
    );
    return promise;
}
