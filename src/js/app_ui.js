
// var addClass = function(class) {
// 	var id = this.id;
// 	document.getElementById(id).classList.add("selected");
// }


// //get container div + add photo div to it

// var newPhotoElement = function() {

// 	var newPhotoContainer = document.createElement("div").className("photo_container lightbox");

// 	var newPhoto = document.createElement("img").className("photo");

// 	var newPhotoTitle = document.createElement("p").className("photo_title");

// 	newPhotoContainer.appendChild(newPhoto).appendChild(newPhotoTitle);

// }






// var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=e45668aaa6d50226c2df38b2f2d75c86&user_id=84003820@N05&format=json&nojsoncallback=1';

// //twitter image url : https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg



// var buildHTML = function(photoArr) {
//   var urlArr = [];
//   // var titleArr = [];

//   for(var i = 0; i < photoArr.length; i++) {
//     //get JSON values
//     var farmId = photoArr[i].farm;
//     var serverId = photoArr[i].server;
//     var photoId = photoArr[i].id;
//     var secret = photoArr[i].secret;
//     var photoTitle = photoArr[i].title;
//     //build photo url
//     var imageUrl = "https://farm" + farmId + ".staticflickr.com/" + serverId +"/" + photoId + "_" + secret + ".jpg";
//     // urlArr.push(imageUrl);
//     // titleArr.push(photoTitle);
//     // console.log(urlArr);
//     // console.log(titleArr);

//     //build HTML
//     var container = getElementById('album');
//     var lightbox = document.createElement('div').classList.add("lightbox");

//     lightbox.innerHTML = '<img id =' + i + 'class= "photo" src="' + imageUrl + '"><p class= "photo_title">' + photoTitle + '</p>'
//     container.appendChild(lightbox);

//   }
  
// }

// // var buildHTML = function(urlArr) {
// //   for(var i = 0; i < photoArr.length; i++) {
// //     var lightbox = document.createElement('div').classList.add("lightbox");
// //     lightbox.innerHTML = '<img class= "photo" src="' + imageUrl + '">
// //         <p class= "photo_title">' + photoTitle + '</p>'
// //     var container = getElementById('album');
// //     container.appendChild(lightbox);
// //   }
// // }




// // var getJSONvalues = function(photoArr, i) {
// //   var farmId = photoArr[i].farm;
// //   var serverId = photoArr[i].server;
// //   var photoId = photoArr[i].id;
// //   var secret = photoArr[i].secret;
// //   var photoTitle = photoArr[i].title;
// //   console.log(farmId, serverId, photoId, secret, photoTitle);  
// //   return farmId, serverId, photoId, secret, photoTitle;
// // }

// // var imageUrl = function(farmId, serverId, photoId, secret) {
// // 	return "https://farm" + farmId + ".staticflickr.com/" + serverId +"/" + photoId + "_" + secret + ".jpg";
// // }

// // var photoHTML = function(imageUrl) {
// // 	return '<img class= "photo" src="' + imageUrl + '">'
// // }




// function getJSON(method, url) {

//   return new Promise(function(resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.responseType = "json";
//     xhr.onload = function() {
//       if (xhr.status == 200) {
//         resolve(xhr.response);
//       }
//       else {
//         reject(Error(xhr.statusText));
//       }
//     };

//     //network errors
//     xhr.onerror = function() {
//       reject(Error("Network Error"));
//     };

//     xhr.send();
//   });
// }


// var JSON = getJSON("GET", url).then(function(response) {
//   return response.photos.photo;
// }, function(error) {
//   console.error("Something went wrong!", error);
// }).then(buildHTML);




// JSON();













