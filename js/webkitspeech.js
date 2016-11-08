var recognition;

function startRecognition() {
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
function voiceResponse(text) {
    if ($('#speech')[0].checked) {
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
}
