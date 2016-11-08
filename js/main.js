jQuery(document).ready(function($) {
    var text = "What should I wear?"; //default query
    $("#input").val(text);

    setup();
    api_ai();

    getWeather();//TEST
});


//Setup function
function setup() {
    $('#json').hide();
    //Make input field dynamic
    $('input[type="text"]')
        .keyup(resizeInput) // event handler
        .each(resizeInput); // resize on page load

    //keylistener (enter)
    $('#input').keypress(function(e) {
        if (e.which == 13) {
            api_ai();
        }
    });
}

//Dynamic input field
function resizeInput() {
    $(this).attr('size', $(this).val().length);
}

//Call function depending on action
function triggerAction(action) {
    switch (action) {
        case "weather-action":
            weather_action();
            break;
        case "user-information":
            //TODO add username and age
            break;
        case "temperature-training":
            //TODO add support for voice training
            break;
        default:
            console.log('unsuported action', action);
            break;
    }
}

function weather_action() {
    var weather = getRandomWeather();
    var cels = Math.round(parseFloat(weather) * 100) / 100;
    suggestClothes(cels);
}

//Give cloth  suggestion based on temperature
function suggestClothes(temp) {
    var clothing;
    clothing = getCloth(parseInt(kNearestNeighbours(temp)));
    var response = 'It is ' + temp + ' degrees outside, you should wear ' + clothing;
    voiceResponse(response);
    $('#wear').text(response);
}

//Updates the response p element
function setResponse(val) {
    $("#response").text(val);
}

var visible = false;

function toggleJSONDebug() {
    if (visible) {
        $('#json').hide();
        $('#jsonBtn')[0].innerHTML = "Show";
        visible = false;
    } else {
        $('#json').show();
        $('#jsonBtn')[0].innerHTML = "Hide";
        visible = true;
    }
}
