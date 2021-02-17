'use strict';

function PreetyPic(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  PreetyPic.allPics.push(this);
}
PreetyPic.allPics = [];


PreetyPic.prototype.renderPic = function(){
  const $liCopy = $('li:first-child').clone();
  $liCopy.find('h2').text(this.title);
  $liCopy.find('img').attr('src', this.image_url);
  $liCopy.find('p').text(this.description);
  // $liCopy.find('p').number(this.horns);
  $liCopy.attr('class', this.horns);
  // console.log(this);
  // console.log($liCopy);
  $('ul').append($liCopy);
  console.log('startApp', $('ul').html());
};
$.ajax('./data/page-1.json').then(callbackForPics);

function callbackForPics(newPics){
  newPics.forEach(Json => {
    new PreetyPic(Json.title, Json.image_url, Json.description, Json.keyword, Json.horns);
  });
  PreetyPic.allPics.forEach(allPics => allPics.renderPic());
}






