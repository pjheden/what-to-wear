//Stores data on the users browser, limit 5MB
//values are always stored as key, Number(value) to convert to int

var storageSupport;
jQuery(document).ready(function($) {
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        storageSupport = true;
    } else {
        // Sorry! No Web Storage support..
        storageSupport = false;
    }
});

function saveObject(key, obj) {
  saveData(key, JSON.stringify(obj));
}

function getObject(key) {
  return JSON.parse(getData(key));
}

function saveData(key, value) {
    if (storageSupport) localStorage.setItem(key, value);
}

function getData(key) {
    if (!storageSupport) return undefined;
    return localStorage.getItem(key);
}

function removeData(key) {
    if (storageSupport) localStorage.removeItem(key);
}

function getAllKeys() {
    var keys = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        keys.push(localStorage.key(i));
    }
    return keys;
}

function getAllData() {
    var data = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        data.push(localStorage.getItem(localStorage.key(i)));
    }
    return data;
}

//TODO
function getWeatherImg(){

}
