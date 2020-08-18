  document.querySelector('#getUserMediaButton').addEventListener('click', onGetUserMediaButtonClick);
  document.querySelector('#takePhotoButton').addEventListener('click', onTakePhotoButtonClick);
  var imageCapture;

function onGetUserMediaButtonClick() {
  navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => {
    document.querySelector('video').srcObject = mediaStream;

    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
  })
  .catch(error => ChromeSamples.log(error));
}

function onTakePhotoButtonClick() {
  imageCapture.takePhoto()
  .then(blob => createImageBitmap(blob))
  .then(imageBitmap => {
    const canvas = document.querySelector('#takePhotoCanvas');
    drawCanvas(canvas, imageBitmap);

    document.getElementById('download').classList.add("enable");
    document.querySelector('#salvar').disabled = false;
  })
  .catch(error => ChromeSamples.log(error));
}

/* Utils */

function drawCanvas(canvas, img) {
  canvas.width = getComputedStyle(canvas).width.split('px')[0];
  canvas.height = getComputedStyle(canvas).height.split('px')[0];
  let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
      x, y, img.width * ratio, img.height * ratio);
}

  document.querySelector('video').addEventListener('play', function() {
  document.querySelector('#takePhotoButton').disabled = false;
});

  var canvas = document.getElementById("takePhotoCanvas");
  var ctx = canvas.getContext("2d");
  var ox = canvas.width / 2;
  var oy = canvas.height / 2;

  download_img = function(el) {
    var image = canvas.toDataURL("image/jpg");
    el.href = image;
};