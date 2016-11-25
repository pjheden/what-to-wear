var data;
jQuery(document).ready(function($) {

    data = getObject("clothes");
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

function getCloth(clothInt) {
  for (var i = 0; i < data.length; i++) {
    if(parseInt(data[i].value) == clothInt)
      return data[i].name;
  }
}

function getClothesImg(cloth) {
  for (var i = 0; i < data.length; i++) {
    if(parseInt(data[i].value) == cloth)
      return data[i].imgPath;
  }
}

function getNumbersClothes(){
  return getObject("clothes").length;
}
