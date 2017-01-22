
jQuery(document).ready(function($) {

    var data = getObject("clothes");
    if(data){
      //generateForms

    }else{
      //create stock data
      data = createDefaultClothes();
    }
});

function createDefaultClothes(){
  var dataObjects = [];

  dataObjects.push({
    'value': 1,
    'name': 'a T-Shirt',
    'imgPath': './images/tshirt.svg'
  });

  dataObjects.push({
    'value': 2,
    'name': 'a Sweater',
    'imgPath': './images/sweater.svg'
  });

  dataObjects.push({
    'value': 3,
    'name': 'a Jacket',
    'imgPath': './images/thick_sweater.svg'
  });

  dataObjects.push({
    'value': 4,
    'name': 'a Winter Coat',
    'imgPath': './images/coat.svg'
  });

  saveObject("clothes", dataObjects);
  return dataObjects;
}

function getAllClothes(){
  var clothes = [];
  clothes.push({'iconFilePath': './images/tshirt.svg', 'iconValue': 1});
  clothes.push({'iconFilePath': './images/sweater.svg', 'iconValue': 2});
  clothes.push({'iconFilePath': './images/thick_sweater.svg', 'iconValue': 3});
  clothes.push({'iconFilePath': './images/coat.svg', 'iconValue': 4});
  clothes.push({'iconFilePath': './images/woman-bikini.svg', 'iconValue': 5});

  return clothes;
}

function getCloth(clothInt) {
  var data = getObject("clothes");
  for (var i = 0; i < data.length; i++) {
    if(parseInt(data[i].value) == clothInt)
      return data[i].name;
  }
}

function getClothesImg(cloth) {
  var data = getObject("clothes");
  for (var i = 0; i < data.length; i++) {
    if(parseInt(data[i].value) == cloth)
      return data[i].imgPath;
  }
}

function getNumbersClothes(){
  return getObject("clothes").length;
}
