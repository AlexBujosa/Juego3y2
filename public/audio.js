const audio = document.querySelector("audio");

function up() {
  audio.play();
  audio.volume = 0.4;
  document.getElementById("volume-on").style.display = "block";
  document.getElementById("volume-off").style.display = "none";
}

function silences() {
  audio.volume = 0;
  document.getElementById("volume-on").style.display = "none";
  document.getElementById("volume-off").style.display = "block";
}

setInterval(function () {
  audio.play();
}, 1000 * 175);
