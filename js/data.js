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

//NOTE clothes are hardcoded for the moment
function getCloth(data) {
    switch (data) {
        case 1:
            return 'a T-Shirt';
            break;
        case 2:
            return 'a Sweater';
            break;
        case 3:
            return 'a T-Shirt and a Jacket';
            break;
        case 4:
            return 'a Sweater and a Jacket';
            break;
        default:
            return 'undefined';

    }
}

function getNumbersClothes(){
  return 4;
}
