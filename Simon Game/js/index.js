var level = 1;
var strict = false;
var pattern = [];
//green = 0; yellow = 1; red = 2; blue = 3;
var response = [];
var lose = false;
var audio = [];

$(document).ready(function(){
  for(var i = 1; i < 5; i++){
    audio.push(document.createElement("audio"));
    audio[i-1].setAttribute("src", "https://s3.amazonaws.com/freecodecamp/simonSound"+i+".mp3");
  }
  
  $(".switch").on("click", function(){
    if($(".off").hasClass("switch-active")){
      turnOn();
    } else {
      turnOff();
    }
  });
});

function turnOn(){
  $(".off").removeClass("switch-active");
  $(".on").addClass("switch-active");
  $(".count-display").css("color", "#c40101");
  $(".start").on("click", function(){
    startGame();
  });
  $(".strict").on("click", function(){
    strict = !strict;
    if(strict)
      $(".strict-light").css("background-color", "#e84545");
    else
      $(".strict-light").css("background-color", "#111");
  });
}

function turnOff(){
  $(".on").removeClass("switch-active");
  $(".off").addClass("switch-active");
  $(".count-display").css("color", "#590101");
  $(".count-display").text("- -");
  $(".button").off("click");
  $(".strict-light").css("background-color", "#111");
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}

function startGame(){
  pattern = [];
  level = 1;
  lose = false;
  $(".count-display").text("0"+level);
  makePattern();
  displayPattern();
  userPattern();
}

function makePattern(){
  let rand = Math.floor(4*Math.random());
  pattern.push(rand);
}

function displayPattern(){
  $(".color").off("click");
  var i = 0;  
  var repeatThis = function(){
    if(pattern[i] === 0){
      $(".green").css("background-color", "#bfffe8");
      audio[0].play();
      setTimeout(function(){
        $(".green").css("background-color", "#03ba5b");
      }, 1000);
    } else if(pattern[i] === 1){
      $(".yellow").css("background-color", "#f4ffbf");
      audio[1].play();
      setTimeout(function(){
        $(".yellow").css("background-color", "#bab602");
      }, 1000);
    } else if(pattern[i] === 2){
      $(".red").css("background-color", "#fcb3b3");
      audio[2].play();
      setTimeout(function(){
        $(".red").css("background-color", "#700202");
      }, 1000);
    } else if(pattern[i] === 3){
      $(".blue").css("background-color", "#b2ccfc");
      audio[3].play();
      setTimeout(function(){
        $(".blue").css("background-color", "#0145ba");
      }, 1000);
    }
    
    if(i++ >= pattern.length)
      clearInterval(repeatThis);
  }
  setInterval(repeatThis, 1200);
}

function userPattern(){
  response = [];
  var i = 1;
  var timer = setTimeout(function(){
    checkPattern();
  }, level*7000);
  $(".color").on("click", function(){
    clearTimeout(timer);
    if($(this).hasClass("green")){
      response.push(0);
      audio[0].play();
      $(".green").css("background-color", "#bfffe8");
      setTimeout(function(){
        $(".green").css("background-color", "#03ba5b");
      }, 100);
    } else if($(this).hasClass("yellow")){
      response.push(1);
      audio[1].play();
      $(".yellow").css("background-color", "#f4ffbf");
      setTimeout(function(){
        $(".yellow").css("background-color", "#bab602");
      }, 100);
    } else if($(this).hasClass("red")){
      response.push(2);
      audio[2].play();
      $(".red").css("background-color", "#fcb3b3");
      setTimeout(function(){
        $(".red").css("background-color", "#700202");
      }, 100);
    } else if($(this).hasClass("blue")){
      response.push(3);
      audio[3].play();
      $(".blue").css("background-color", "#b2ccfc");
      setTimeout(function(){
        $(".blue").css("background-color", "#0145ba");
      }, 100);
    }
    
    if(i++ >= level){
      checkPattern();
    }
  });
}

function checkPattern(){
  $(".color").off("click");
  if(response.length !== pattern.length)
    lose = true;
  else{
    for(let j = 0; j < pattern.length; j++){
      if(response[j] != pattern[j]){
        lose = true;
        break;
      }
    }
  }
 
  if(lose){
    $(".count-display").text("!!");
    if(strict){
      setTimeout(function(){
        pattern = [];
        startGame();
      }, 1000);
    } else{
      lose = false;
      setTimeout(function(){
        if(level < 10)
          $(".count-display").text("0"+level);
        else
          $(".count-display").text(level);
        displayPattern();
        userPattern();
      }, 1000);
    }
  } else{
    level++;
    if(level < 10)
      $(".count-display").text("0"+level);
    else
      $(".count-display").text(level);
    makePattern();
    displayPattern();
    userPattern();
  }
}