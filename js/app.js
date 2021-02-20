'use strict';

function HornPics(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  HornPics.allPics.push(this);
}
HornPics.allPics = [];

HornPics.prototype.renderPic = function(){
  const $liCopy = $('li:first-child').clone();
  $liCopy.find('h2').text(this.title);
  $liCopy.find('img').attr('src', this.image_url);
  $liCopy.find('p').text(this.description);
  const container = document.createElement('div');
  container.innerHTML = $liCopy.html();
  $('ul').append(container);

  console.log('startApp', $('ul').html());
};

HornPics.prototype.renderPicMustache = function(){
  const picTemplateHtml = $('#mustache-template').html();
  const outputFromMustache = Mustache.render(picTemplateHtml, this);

  $('ul').append(outputFromMustache);
};

$.ajax('./data/page-1.json').then(callbackForPics);

// First Set of Pics
function callbackForPics(newPics){
  newPics.forEach(Json => {
    new HornPics(Json.title, Json.image_url, Json.description, Json.keyword, Json.horns);
  });
  HornPics.allPics.forEach(onePic => onePic.renderPicMustache());
}

// Second Set of Pics


$('button:first-of-type').on('click', () => {
  $('ul').empty();
  HornPics.allPics = [];
  $.ajax('./data/page-1.json').then(callbackForPics);
  HornPics.allPics.forEach(onePic => onePic.renderPicMustache());
});

$('button:nth-of-type(2)').on('click', () => {
  $('ul').empty();
  HornPics.allPics = [];
  $.ajax('./data/page-2.json').then(callbackForPics);
  HornPics.allPics.forEach(onePic => onePic.renderPicMustache());
});
renderDropdown();

function renderDropdown() {
  if ($('select:contains(Filter by Keyword)').length === 0) {
    $('select').append(`<option value = "#mustache-template">Filter by Keyword</option>`);
  }
  console.log();
}



// function showKeywordHideOthers(keyword){
//   $('li').hide();
//   // $(`li:contains(${keyword})`).show();
//   $(`.${keyword}`).show()
