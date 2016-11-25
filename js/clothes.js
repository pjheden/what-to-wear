//TODO
/*
  1. Display all curent clothes, and allow edit of name and image.
  2. Allow for adding new clothes
    1. New name
    2. upload image or use existing image
*/

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

// //NOTE clothes are hardcoded for the moment
// function getCloth(data) {
//     switch (data) {
//         case 1:
//             return 'a T-Shirt';
//             break;
//         case 2:
//             return 'a Sweater';
//             break;
//         case 3:
//             return 'a thick Sweater';
//             break;
//         case 4:
//             return 'a warm Jacket';
//             break;
//         default:
//             return 'undefined';
//
//     }
// }
//
// function getClothesImg(cloth){
//   switch (cloth) {
//       case 1:
//           // return 'a T-Shirt';
//           return './images/tshirt.svg';
//           break;
//       case 2:
//           // return 'a Sweater';
//           return './images/sweater.svg';
//           break;
//       case 3:
//           // return 'a Thick Sweater';
//           return './images/thick_sweater.svg';
//           break;
//       case 4:
//           // return 'a warm Jacket';
//           return './images/coat.svg';
//           break;
//       default:
//           return './images/woman_bikini.svg';//only for fun
//           // return 'undefined';
//
//   }
// }
