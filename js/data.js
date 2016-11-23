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
            return 'a thick Sweater';
            break;
        case 4:
            return 'a warm Jacket';
            break;
        default:
            return 'undefined';

    }
}

function getClothesImg(cloth){
  switch (cloth) {
      case 1:
          // return 'a T-Shirt';
          return './images/tshirt.svg';
          break;
      case 2:
          // return 'a Sweater';
          return './images/sweater.svg';
          break;
      case 3:
          // return 'a Thick Sweater';
          return './images/thick_sweater.svg';
          break;
      case 4:
          // return 'a warm Jacket';
          return './images/coat.svg';
          break;
      default:
          return './images/woman_bikini.svg';//only for fun
          // return 'undefined';

  }
}

//TODO
function getWeatherImg(){

}

//TODO make dynamic
function getNumbersClothes(){
  return 4;
}
