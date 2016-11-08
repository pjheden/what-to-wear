//Calls api.ai with text from input field
function api_ai() {
    var baseUrl = "https://api.api.ai/v1/";
    var accessToken = getAiKey(); //client token
    var text = $("#input").val();
    //var lang = "en-US";
    request(baseUrl, accessToken, text);
    setResponse('loading ... ');
}

//make a request to baseUrl with accessToken and given text
function request(baseUrl, accessToken, text) {
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({
            q: text,
            lang: "en"
        }),
        success: function(data) {
            $('#action').text('action: ' + data.result.action);
            $('#json').text('action: ' + JSON.stringify(data, null, 2));
            triggerAction(data.result.action);
            if (data.result.action != 'weather-action') {
                voiceResponse(data.result.fulfillment.speech);
            }
            setResponse('Output: ' + JSON.stringify(data.result.fulfillment.speech, undefined, 2));
        },
        error: function() {
            setResponse("Internal Server Error");
        }
    });
}
