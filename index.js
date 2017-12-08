var videos = [];

function insertVideo(title, videoId) {
  var newVideo = {
    title: title,
    videoId: videoId
  };

  var appendVideo = Handlebars.templates.insertVideo(newVideo);

  var videos = document.getElementById('videos');
  videos.insertAdjacentHTML('beforeend', appendVideo);
}

function showModal() {

  var modal = document.getElementById('modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  modal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}

function clearModalInputs() {

  var inputs = [
    document.getElementById('video-text-input'),
    document.getElementById('video-source-input'),
  ];

  inputs.forEach(function (input) {
    input.value = '';
  });

}

function hideModal() {

  var modal = document.getElementById('modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  modal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');

  clearModalInputs();

}
/*
//filters for min
for(var i = 0; i < 8; i++) {
  if(min != "") { //checks if min is not empty
    if (price[i] < min) {
      allPostElems[i].style.display = "none";
    }
  }
}

//filters for max
for(var i = 0; i < 8; i++) {
  if (max != "") { //checks if max is not empty
    if (price[i] > max) {
      allPostElems[i].style.display = "none";
    }
  }
}

//filters for title
for(var i = 0; i < 8; i++) {
 if (text != "") { //checks for emptiness
   if (title[i].indexOf(text) === -1) {
     allPostElems[i].style.display = "none";
   }
 }
}
*/

function modalAccept() {
  var title = document.getElementById('video-text-input').value.trim();
  var url = document.getElementById('video-source-input').value.trim();

  if (!title || !url) {
    alert("You must fill in all of the fields!");
  }
  else {

    var parser = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(parser);
    var videoId;
    if (match && match[2].length == 11) {

      videos.push({
        title: title,
        videoId: videoId
      });

      videoId = match[2];
      insertVideo(title, videoId);
      hideModal();
    } else {
      alert("Please enter a valid URL.");
    }
  }

}

window.addEventListener('DOMContentLoaded', function () {

  var addVideoButton = document.getElementById('add-video-button');
  if (addVideoButton) {
    addVideoButton.addEventListener('click', showModal) ;
  }

  var postVideoButton = document.getElementById('modal-accept');
  if (postVideoButton) {
    postVideoButton.addEventListener('click', modalAccept);
  }

  var hideModalButton = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < hideModalButton.length; i++) {
    hideModalButton[i].addEventListener('click', hideModal);
  }

});
