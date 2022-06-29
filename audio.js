const audio = document.querySelector("audio");
audio.volume = 0.4;
audio.play();
function up()
{
    audio.volume = 0.4;
    document.getElementById("vol02").style.display = "block";
    document.getElementById("vol0").style.display = "none";
}
function silences()
{
    audio.volume = 0;
    document.getElementById("vol02").style.display = "none";
    document.getElementById("vol0").style.display = "block";
}
setInterval(function(){
    audio.play();
},1000 * 175);



