var apiKey = getWeatherKey();
var baseUrl = 'https://api.wunderground.com/api/';
var country = 'Sweden';
var city = 'Stockholm';


//Get user location
var onSuccess = function(location){
  country = location.country.names.en;
  city = location.city.names.en;
};

var onError = function(error){
  alert(
      "Error:\n\n"
      + JSON.stringify(error, undefined, 4)
  );
};

// geoip2.country(onSuccess, onError);
geoip2.city(onSuccess, onError);


//Returns a promise to give the weather
function getWeather() {
    var promise = new Promise(
        function(resolve, reject) {
            var weatherPromise = fetchWeather();

            weatherPromise.then(function(weather) {
                resolve(weather);
            }, function(error) {
                reject(error);
            });
        });
    return promise;
}

function getCountry() {
    return country;
}

function getCity() {
    return city;
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
                url: baseUrl + apiKey + "/geolookup/conditions/q/" + country + '/' + city + ".json",
                dataType: "jsonp",
                success: function(parsed_json) {
                    console.log(parsed_json);
                    if (parsed_json['response']['error']) {
                        reject('Error');
                    } else {

                        var temp = {
                            real: undefined,
                            feel: undefined
                        };
                        temp.real = parsed_json['current_observation']['temp_c'];
                        temp.feel = parsed_json['current_observation']['feelslike_c'];
                        resolve(temp);
                    }
                },
                error: function() {
                    reject('Error, weather request timed out');
                }
            });
        }
    );
    return promise;
}
