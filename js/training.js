jQuery(document).ready(function($) {

    var data = getObject("training");
    if(data){
      //generateForms
      for (var i = 0; i < data.length; i++) {
        generateForm(i, data[i].temp, data[i].clothing);
      }
    }else{
      //create stock data
      createDefaultData();
    }
});

function createDefaultData(){
  var start_temp = -5;
  var increment = (25 + Math.abs(start_temp)) / getNumbersClothes();
  var dataObjects = [];
  for (var i = 0; i < getNumbersClothes(); i++) {
      generateForm(i, start_temp, getNumbersClothes()-i);
      dataObjects.push({
        "temp": start_temp,
        "clothing": getNumbersClothes()-i
      });
      start_temp += increment;
  }
  saveObject("training", dataObjects);
}

//Sort array of string ints
function sortInts(a,b) {
    return parseInt(a) - parseInt(b);
}

/*
  Makes a educated guess on clothing
  using k-nearest neighbours algorithm
*/
function kNearestNeighbours(temperature) {
    var closest_key = {
      "temp": 999,
      "clothing": undefined
    };
    var keys = getObject("training");
    for (var i = 0; i < keys.length; i++) {
        if (Math.abs(temperature - keys[i].temp) < Math.abs(closest_key.temp)) {
            closest_key = keys[i];
        }
    }
    console.log('closest', closest_key.temp);
    console.log('temperature', temperature);
    return closest_key.clothing;
}

var visible = false;

function toggleTraining() {
    if (visible) {
        $('.trainingContainer').hide();
        $('#saveBtn').hide();
        $('#plusBtn').hide();
        $('#clothBtn').hide();
        $('#trainBtn')[0].innerHTML = "Show";
        visible = false;
    } else {
        $('.trainingContainer').show();
        $('#saveBtn').show();
        $('#plusBtn').show();
        $('#clothBtn').show();
        $('#trainBtn')[0].innerHTML = "Hide";
        visible = true;
        removeClothForms();
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

    var dataObjects = [];

    for (var i = 0; i < temps.length; i++) {
        if (temps[i] && clothings[i] && is_numeric(temps[i])){
          dataObjects.push({
              "temp":  temps[i],
              "clothing": clothings[i]
          });
        }
    }
    saveObject("training", dataObjects);

    // for (var i = 0; i < temps.length; i++) {
    //     if (temps[i] && clothings[i] && is_numeric(temps[i]))
    //         saveData(temps[i], clothings[i]);
    // }
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

//Add clothing
function addCloth(){
  toggleTraining();
  var data = getObject("clothes");
  for (var i = 0; i < data.length; i++) {
    generateClothingForm(data[i]);
  }
  generateClothingAddForm();
}

function removeClothForms(){
  $('.clothDiv').remove();
}

function generateClothingForm(clothObj){
  var html = '<div class="clothDiv" style="width:8em; height:10em; float:left; text-align:center;">';
  html +='<img src="'+clothObj.imgPath+'" alt="'+clothObj.name+'" style="width:100%; height:60%;">';
  html +='<p style="width:100%; height:20%; padding:10%;">'+clothObj.name+'</p>';
  html += '</div>';

  $('.containerT').append(html);
}

function generateClothingAddForm(){
  var html;
  var html = '<div class="clothDiv" style="width:8em; height:10em; float:left; text-align:center;">';
  html += '<input type="text" value="" name="cloth" placeholder="Scarf and a Jacket">';
  html += '<input type="text" value="" name="path" placeholder="C:/images/scarf_and_jacket.svg">';
  html += '<button onclick="saveNewClothing()" class="btn btn-info" style="float:center;">Add</button>';
  html += '</div>';

  $('.containerT').append(html);
}

//Save the clothing to db, add it to the list and clear input
function saveNewClothing(){
  var clothObj = {
    'value': undefined,
    'name': undefined,
    'imgPath': undefined
  };

  $('.clothDiv input[name="cloth"').each(function() {
    clothObj.name = this.value;
  });
  $('.clothDiv input[name="path"').each(function() {
    clothObj.imgPath = this.value;
  });

  if(clothObj.name && clothObj.imgPath){
    //Add it to previous data and save it
    var data = getObject("clothes");
    console.log('new obj value', data.length +1 );
    clothObj.value = data.length + 1;
    data.push(clothObj);
    saveObject("clothes", data);
  }

  //Redraw the clothing
  removeClothForms();
  toggleTraining();
}
