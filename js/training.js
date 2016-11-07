jQuery(document).ready(function($) {
    //Load all saved data
    generateForm(2, 22, 1);
    generateForm(3, 22, 2);
    generateForm(4, 30, 3);
    generateForm(5, 25, 4);
});

function save() {
    /*
      loop through all forms and save the data
      Save all data in the users browser
      Display success
    */
}

//Generate html form
function generateForm(day, celcius = undefined, clothing = undefined) {
    /* ----------Pattern------------
    <div class="trainingContainer">
        <p>Day 1</p>
        <form>
            Temperature(Celsius):<br>
            <input type="text" name="temperature"><br> Clothes:
            <br>
            <select>
              <option value="1">T-shirt</option>
              <option value="2">Sweater</option>
              <option value="3">T-shirt and a Jacket</option>
              <option value="4">Sweater and a Jacket</option>
            </select>
        </form>
    </div>
    */
    var html = '<div class="trainingContainer">';
    html += '<p>Day ' + day + '</p>';
    html += '<form>Temperature(Celsius):<br>'
    html += '<input type="text" name="temperature" value="' + ((celcius) ? celcius : "") + '"><br>';
    html += 'Clothes:<br>';
    html += '<select>';
    html += '<option value="1" ' + ((clothing == 1) ? "selected=selected" : "") + '>T-shirt</option>';
    html += '<option value="2" ' + ((clothing == 2) ? "selected=selected" : "") + '>Sweater</option>';
    html += '<option value="3" ' + ((clothing == 3) ? "selected=selected" : "") + '>T-shirt and a Jacket</option>';
    html += '<option value="4" ' + ((clothing == 4) ? "selected=selected" : "") + '>Sweater and a Jacket</option>';
    html += '</select></form></div>';

    $('.containerT').append(html);
}
