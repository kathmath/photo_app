"use strict";

var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=e45668aaa6d50226c2df38b2f2d75c86&user_id=84003820@N05&format=json&nojsoncallback=1';

//twitter image url : https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg


var buildHTML = function(photoArr) {

  for(var i = 0; i < photoArr.length; i++) {
    //get JSON values
    var farmId = photoArr[i].farm;
    var serverId = photoArr[i].server;
    var photoId = photoArr[i].id;
    var secret = photoArr[i].secret;
    var photoTitle = photoArr[i].title;

    //build photo url
    var imageUrl = "https://farm" + farmId + ".staticflickr.com/" + serverId +"/" + photoId + "_" + secret + ".jpg";

    //build HTML
    var container = document.getElementById("album");
    var photo_container = document.createElement("div");

    // var photo = document.createElement("image");

    photo_container.classList.add("photo_container");
    photo_container.setAttribute("id", i);
    // photo.classList.setAttribute("id", imageUrl);

    photo_container.innerHTML = "<img class= 'photo' src=" + imageUrl + "><p class= 'photo_title'>" + photoTitle + "</p>";
    
    // photo_container.appendChild(photo);
    container.appendChild(photo_container);

  }
  
}


function getJSON(method, url) {

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = function() {
      if (xhr.status == 200) {
        resolve(xhr.response);
      }
      else {
        reject(Error(xhr.statusText));
      }
    };

    //network errors
    xhr.onerror = function() {
      reject(Error("Network Error"));
    };

    xhr.send();
  });
}

//putting everything together

getJSON("GET", url).then(function(response) {
  return response.photos.photo;
}, function(error) {
  console.error("Something went wrong!", error);
}).then(buildHTML);















