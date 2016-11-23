jQuery(document).ready(function($) {
    var keys = getAllKeys();
    keys.sort(sortInts);
    console.log(keys);
    //Load all saved data
    if (keys.length != 0) {
        for (var i = 0; i < keys.length; i++) {
            generateForm(i, keys[i], getData(keys[i]));
        }
    } else {
        //no existant data, TODO create stock data
        var start_temp = -5;
        var increment = (25 + Math.abs(start_temp)) / getNumbersClothes();
        for (var i = 0; i < getNumbersClothes(); i++) {
            generateForm(i, start_temp, getNumbersClothes()-i);
            saveData(start_temp,  getNumbersClothes()-i);
            start_temp += increment;
        }
    }
});

//Sort array of string ints
function sortInts(a,b) {
    return parseInt(a) - parseInt(b);
}

/*
  Makes a educated guess on clothing
  using k-nearest neighbours algorithm
*/
function kNearestNeighbours(temperature) {
    var closest_key = 999;
    var keys = getAllKeys();
    for (var i = 0; i < keys.length; i++) {
        if (Math.abs(temperature - keys[i]) < Math.abs(closest_key)) {
            closest_key = keys[i];
        }
    }
    console.log('closest', closest_key);
    console.log('temperature', temperature);
    return getData(closest_key);
}

var visible = false;

function toggleTraining() {
    if (visible) {
        $('.trainingContainer').hide();
        $('#saveBtn').hide();
        $('#plusBtn').hide();
        $('#trainBtn')[0].innerHTML = "Show";
        visible = false;
    } else {
        $('.trainingContainer').show();
        $('#saveBtn').show();
        $('#plusBtn').show();
        $('#trainBtn')[0].innerHTML = "Hide";
        visible = true;
    }

}

/*
  loop through all forms and save the data
  Save all data in the users browser
  Display success
*/
function saveForms() {
    buttonConfirmationAnimation('saveBtn');

    var temps = [];
    var clothings = [];
    $('.trainingContainer input').each(function() {
        temps.push(this.value);
    })
    $('.trainingContainer select option:selected').each(function() {
        clothings.push(this.value);
    })

    for (var i = 0; i < temps.length; i++) {
        if (temps[i] && clothings[i] && is_numeric(temps[i]))
            saveData(temps[i], clothings[i]);
    }
}

//Checks that a string holds numeric values
function is_numeric(str) {
    return /^-?\d*\.{0,1}\d+$/.test(str);
}

function buttonConfirmationAnimation(buttonId) {
    var button = $('#' + buttonId);
    var bgcolor = button.css('background-color');
    var bcolor = button.css('border-color');
    button[0].innerHTML = 'Saved!';
    button.css('background-color', 'green');
    button.css('border-color', 'green');

    setTimeout(function() {
        button[0].innerHTML = 'Save';
        button.css('background-color', bgcolor);
        button.css('border-color', bcolor);
    }, 3000);
}

//Add a form
function addForm() {
    generateForm($('.trainingContainer').length, undefined, undefined, false);
}

//Remove the data, then allow the form to be edited
function editForm(buttonId) {
    removeData($('#' + buttonId + 'trainingForm input').val());

    $('#' + buttonId + 'trainingForm input').prop('disabled', false);
    $('#' + buttonId + 'trainingForm select').prop('disabled', false);
}

// Delete data, and remove form
function removeForm(buttonId) {
    removeData($('#' + buttonId + 'trainingForm input').val());
    $('#' + buttonId + 'trainingForm').remove();
}
//Generate html form
function generateForm(day, celcius = undefined, clothing = undefined, hidden = true) {
    var html = '<div class="trainingContainer" id="' + day + 'trainingForm" ' + ((hidden) ? "hidden" : "") + '>';
    html += '<p>Day ' + day;
    html += '<button onclick="removeForm(' + day + ')" class="btn btn-danger" style="float:right;">-</button>';
    html += '<button onclick="editForm(' + day + ')" class="btn btn-info" style="float:right;">Edit</button>';
    html += '</p>';
    html += '<form>Temperature(Celsius):<br>'
    html += '<input type="text" name="temperature" value="' + ((celcius) ? celcius : "") + '" ' + ((hidden) ? "disabled" : "") + '><br>';
    html += 'Clothes:<br>';
    html += '<select ' + ((hidden) ? "disabled" : "") + '>';
    for (var i = 1; i < getNumbersClothes()+1; i++) {
      html += '<option value="' + i + '" ' + ((clothing == i) ? "selected=selected" : "") + '>' + getCloth(i) + '</option>';
    }
    html += '</select></form></div>';

    $('.containerT').append(html);
}
