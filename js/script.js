$(document).ready(function() {

// holds the audio
var chime = $('#chime')[0];

// holds the work timer.
var workCount =
    parseInt($("#workTimer").html());

// holds the break timer
var breakCount = parseInt($("#breakTimer").html());
console.log(breakCount);

// holds the beginning of the break timer within the work timer function.
var beginBreak;


// create the timer mechanism
  $('#startButton').click(function(){
    var counter = setInterval(timer, 1000);
    workCount *= 60; // turns input into minutes
    function timer () {
      $('#startButton, #addWorkTime, #subtractWorkTime, #resetWorkTime, #addBreakTime, #subtractBreakTime, #resetBreakTime, #breakTimer, #workTimeTitle, #breakTimeTitle').hide();
      $('#timeType').html("Work Time");
      workCount -= 1; // counts down by one every second
// if the work timer equals 0, clear the interval, hide it, and signal the break timer!
      if (workCount === 0) {
        chime.play();
        clearInterval(counter);
        $('#workTimer').hide();
        beginBreak = setInterval(breakTime, 1000);
        breakCount *= 60;
      }
      if (workCount%60 >= 10) {
        // ensures that the timer display correctly by adding a 0 to the front of the seconds if they are under 10.
    $('#workTimer').html("0"+Math.floor(workCount/60) + ":" + workCount%60);
      } else {
        $('#workTimer').html("0"+Math.floor(workCount/60) + ":0" +workCount%60);
     }
   }
 });

    function breakTime() {
      $('#timeType').html("Break Time");
      $('#breakTimer').show();
      breakCount -= 1;

// if the break timer is done, show all of the buttons again.
    if (breakCount === 0) {
        chime.play();
        clearInterval(beginBreak);
        $('#timeType').hide();
        $('#startButton, #addWorkTime, #subtractWorkTime, #resetWorkTime, #addBreakTime, #subtractBreakTime, #resetBreakTime, #workTimer, #breakTimer, #workTimeTitle, #breakTimeTitle').show();
      }
      // ensures correct display of the timer digits, as seen above in workCount.
      if (breakCount%60 >= 10) {
       $('#breakTimer').html(Math.floor(breakCount/60) + ":" + breakCount%60);
      } else {
        $('#breakTimer').html(Math.floor(breakCount/60) + ":0" +breakCount%60);
    }
  }

// adds time to break timer in 1 minute increments
$('#addWorkTime').click(function(){
  workCount += 1;
  $('#workTimer').html(workCount);
  console.log(workCount);
});

 // removes time from work timer in 1 minute increments, and stops at 0.
 $('#subtractWorkTime').click(function(){
   if (workCount > 0) {
     workCount -= 1;
   $('#workTimer').html(workCount);
     console.log(workCount);
   }
 });

 // resets the time to the default of 25.

$('#resetWorkTime').click(function(){
  workCount = 25;
  $('#workTimer').html(workCount);
});

// adds time to break counter in one minute increments
$('#addBreakTime').click(function (){
  breakCount += 1;
  $('#breakTimer').html(breakCount);
});

// subtract from break count in 1 minute increments.
$('#subtractBreakTime').click(function (){
  if (breakCount >0) {
    breakCount -= 1;
    $('#breakTimer').html(breakCount);
  }
});
// resets the break time.
  $('#resetBreakTime').click(function () {
    breakCount = 5;
    $('#breakTimer').html(breakCount);
});
  });
