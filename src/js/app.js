"use strict";

var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=e45668aaa6d50226c2df38b2f2d75c86&user_id=84003820@N05&format=json&nojsoncallback=1';

//twitter image url : https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg


//get data from flickr 
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

//If IE 
function getJSONIE() {

  var xhr = new XMLHttpRequest;
  xhr.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=e45668aaa6d50226c2df38b2f2d75c86&user_id=84003820@N05&format=json&nojsoncallback=1', false);
  xhr.onload = function() {
    if (xhr.status === 200) {
        initialHTML(getFromLocalStorage(albumArr(JSON.parse(xhr.responseText).photos.photo)));
    } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}


//build array of objects containing title & url, put in local storage
var albumArr = function(photoArr) {
  var photos = [];
  
  for(var i = 0; i < photoArr.length; i++) {
    //get JSON values
    var farmId = photoArr[i].farm;
    var serverId = photoArr[i].server;
    var photoId = photoArr[i].id;
    var secret = photoArr[i].secret;
    var photoTitle = photoArr[i].title;

    //build photo url
    var imageUrl = "https://farm" + farmId + ".staticflickr.com/" + serverId +"/" + photoId + "_" + secret + ".jpg";

    var photoVals = {};
    photoVals.id = i;
    photoVals.imageUrl = imageUrl;
    photoVals.photoTitle = photoTitle;

    photos.push(photoVals);
  }

  // console.log(photos);
  localStorage.setItem('images', JSON.stringify(photos));
}


var getFromLocalStorage = function() {
  var albumStr = localStorage.getItem('images');
  var photoArr = JSON.parse(albumStr);
  return photoArr;
}

//HTML
var buildHTML = function(photoTitle, imageUrl) {

  //create 
  var container = document.getElementById("album");
  var photoContainer = document.createElement("div");

  //modify
  photoContainer.classList.add("photoContainer");
  photoContainer.innerHTML = "<div id= 'row'><div id= 'previous'><i id = 'left' class='fa fa-chevron-left'></i></div><div id= 'photoWrap'><img id= 'photo' src=" + imageUrl + "></div><div id= 'next'><i id = 'right' class='fa fa-chevron-right'></i></div></div><p id= 'photoTitle'>" + photoTitle + "</p>";
  photoContainer.id = "lightbox";

  // append
  container.appendChild(photoContainer);  

  //add event listeners
  addEvents();
}

//display initial image
var initialHTML = function(photoArr) {
  var photoId = photoArr[0].id;
  var photoTitle = photoArr[0].photoTitle;
  var imageUrl = photoArr[0].imageUrl;

  buildHTML(photoTitle, imageUrl);

  localStorage.setItem("count", 0);
}

//display new image
var newHTML = function(i) {
  
  //make new
  var obj = getFromLocalStorage()[i];
  var photoTitle = obj.photoTitle;
  var imageUrl = obj.imageUrl;


  //reset photo and title
  document.getElementById("photo").src = imageUrl;
  document.getElementById("photoTitle").innerText = photoTitle;

}


//UI CONTROLS
var previous = function() {
  var count = parseInt(localStorage.getItem("count"));
  if(count > 0) {  
    count = count - 1;
    localStorage.setItem("count", count);
  }
  return count;
}

var next = function() {
  var count = parseInt(localStorage.getItem("count"));
  var max = getFromLocalStorage().length;
  if(count < max) {  
    count += 1;
    localStorage.setItem("count", count);
  }
  return count;
}

//events
var addEvents = function() {
  var nextButton = document.getElementById("next");
  var prevButton = document.getElementById("previous");


  nextButton.addEventListener("click", function() { 
    newHTML(next())}, false);
  prevButton.addEventListener("click", function() {
    newHTML(previous())}, false);
}

//key events
document.addEventListener("keydown", checkKey, false);

function checkKey(key) {

    if (key.keyCode == '37') {
       // left arrow
       newHTML(previous());
    }
    else if (key.keyCode == '39') {
       // right arrow
       newHTML(next());
    }
}


//putting everything together
function showPhotos() {
  if(typeof Promise !== "undefined") {
    getJSON("GET", url).then(function(response) {
    return response.photos.photo;
    }, function(error) {
      console;
    }).then(albumArr).then(getFromLocalStorage).then(initialHTML);
  } else {
    getJSONIE();
  }
}  

showPhotos();


  






