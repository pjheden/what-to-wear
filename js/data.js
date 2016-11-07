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
