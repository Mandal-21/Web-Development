// / computer
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var levels = 0;
var started = false;

// Key Press at first glance
$('body').on('keypress', function() {

  // checking started condition
  if (!started) {
    // initializing level
    $('h1').html('Level ' + levels);

    nextSequence();
    started = true;
  }

});




// function to create random number
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  userClickedPattern = [];

  // blinking of button
  var x = '#' + randomChosenColour;
  $(x).fadeOut(100).fadeIn(100);

  // play sound initially
  playSound(randomChosenColour);

  // increase level
  levels++;
  $('h1').html('Level ' + levels);

  gamePattern.push(randomChosenColour);
}

// Audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// User
var userClickedPattern = [];

$('.btn').click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  // animation
  animatePress(userChosenColour);

  // sound
  playSound(userChosenColour);
});



// animation of button
function animatePress(currentColour) {
  $('.' + currentColour).addClass('pressed');

  setTimeout(function() {
    $('.' + currentColour).removeClass('pressed');
  }, 100);

}



function checkAnswer(currentLevel) {

  // checking last color
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    // checking length of array
    if (userClickedPattern.length === gamePattern.length) {

      // Promoted to next Level and directing to nextSequence function
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    // playing wrong song
    playSound('wrong');

    // setting timeout blink
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over')
    }, 200);

    // Change title
    $('h1').text("Game Over, Press Any Key to Restart");

    // start Over
    startOver();
  }
}

// game end and restarting
function startOver() {
  gamePattern = [];
  started = false;
  levels = 0;
}
