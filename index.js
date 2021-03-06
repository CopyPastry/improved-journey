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

function modalAccept() {
  var title = document.getElementById('video-text-input').value.trim();
  var url = document.getElementById('video-source-input').value.trim();


  if (!title || !url) {
    alert("You must fill in all of the fields!");
  }
  else {
    var postRequest = new XMLHttpRequest();
    var postURL = "/post";
    postRequest.open('POST', postURL);

    var parser = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(parser);
    var videoId;
    if (match && match[2].length == 11) {

      videoId = match[2];
      videoObj = {
        title: title,
        videoId: videoId
      };
      videos.push(videoObj);

      var requestBody = JSON.stringify(videoObj);
      postRequest.setRequestHeader('Content-Type', 'application/json');

      postRequest.addEventListener('load', function (event) {
        if (event.target.status !== 200) {
          alert("Error inserting video in database:\n\n\n" + event.target.response);
        } else {
          insertVideo(title, videoId);
        }
      });

      postRequest.send(requestBody);

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
