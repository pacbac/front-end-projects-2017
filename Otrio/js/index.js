var numPlayers = 0;
var turnCounter = 0;
var colors = {
  purple: "rgb(83, 35, 119)",
  blue: "rgb(2, 104, 132)",
  red: "rgb(183, 44, 44)",
  green: "rgb(60, 178, 1)"
}

var slotData = {
  update: function(playerTurn){
    switch(playerTurn){
      case 0: break;
      case 1: break;
      case 2: break;
      case 3: break;
    }
  }
}

$(document).ready(function(){
  $(".menu-option").on("click", function(){
    numPlayers = Number.parseInt(this.id[0]);
    makeBoard();
    playGame();
  });
});

function makeBoard(){
  $(".board").css("background-color", "#e0b36b")
  $(".board").html("");
  for(let i = 0; i < 5; i++){
    $(".board").append('<div class="row row2" id="row'+i+'"></div>')
    for(let j = 0; j < 5; j++){
      if(i > 0 && i < 4 && j > 0 && j < 4)
        $("#row"+i).append('<div class="col board-slot" id="col'+j+'"><div class="slot"></div></div>');
      else
        $("#row"+i).append('<div class="col" id="col'+j+'"><div class="slot"></div></div>');
      if(!(i === 0 && j === 0 || i === 0 && j === 4 || i === 4 && j === 0 || i === 4 && j === 4)){
        $("#row"+i+" #col"+j).html('<div class="ring large-ring"><div class="ring middle-ring"><div class="ring small-ring"></div></div></div>');
        if(i === 0){
          $("#row"+i+" #col"+j+" .ring").css("border-color", colors["purple"]);
          slotData["purple"] = [3, 3, 3]; //large, med, small
        } else if(i === 4){
          $("#row"+i+" #col"+j+" .ring").css("border-color", colors["blue"]);
          slotData["blue"] = [3, 3, 3]; //large, med, small
        } else if(j === 0 && numPlayers >= 3){
          $("#row"+i+" #col"+j+" .ring").css("border-color", colors["red"]);
          slotData["red"] = [3, 3, 3]; //large, med, small
        } else if(j === 4 && numPlayers === 4){
          $("#row"+i+" #col"+j+" .ring").css("border-color", colors["green"]);
          slotData["green"] = [3, 3, 3]; //large, med, small
        }
      }
    }
  }
}

function playGame(){
  turnCounter = 0;
  var playerTurn = 0;
  $(".board-slot .large-ring").click(function(e){
    var ringType = "large-ring";
    playerTurn = selectSlot(playerTurn, ringType, this);
    e.stopPropagation(); //can be placed anywhere in the method
  });
  $(".board-slot .middle-ring").click(function(e){
    var ringType = "middle-ring";
    playerTurn = selectSlot(playerTurn, ringType, this);
    e.stopPropagation();
  });
  $(".board-slot .small-ring").click(function(e){
    var ringType = "small-ring";
    playerTurn = selectSlot(playerTurn, ringType, this);
    e.stopPropagation();
  });
}

function selectSlot(playerTurn, ringType, whichSlot){
  var ringIndex;
  var color;
  switch(ringType){
    case "large-ring": ringIndex = 0; break;
    case "middle-ring": ringIndex = 1; break;
    case "small-ring": ringIndex = 2; break;
  }
  switch(playerTurn){
    case 0: color = "purple"; break;
    case 1: color = "blue"; break;
    case 2: color = "red"; break;
    case 3: color = "green"; break;
  }
  if(slotData[color][ringIndex] > 0){
    $(whichSlot).css("border-color", colors[color]);
    $(whichSlot).off("click");
    removeRing(ringType, color);
    turnCounter++;
    slotData[color][ringIndex]--;
    let isWin = checkWin();
    if(isWin[0]){
      let color = isWin[1];
      switch(color){
        case colors["purple"]: color = "Purple"; break;
        case colors["blue"]: color = "Blue"; break;
        case colors["green"]: color = "Green"; break;
        case colors["red"]: color = "Red"; break;
      }
      $(".board").append("<div class='overlay'>"+color+" player wins!</div>");
      setTimeout(function(){
        makeBoard();
        playGame();
      }, 2000);
    } else if(checkDraw()){
      $(".board").append("<div class='overlay'>It was a draw!</div>");
      setTimeout(function(){
        makeBoard();
        playGame();
      }, 2000);
    }
    return (playerTurn+1)%numPlayers;
  }
  return playerTurn;
}

function removeRing(ringType, color){ //remove ring in player's inventory after usage
  switch(color){
    case "purple":
      for(let j = 1; j < 4; j++){
        if($("#row0 #col"+j+" ."+ringType).css("border-left-color") == "rgb(83, 35, 119)"){
          $("#row0 #col"+j+" ."+ringType).css("border-color", "#846a3f");
          break;
        }
      }
      break;
    case "blue":
      for(let j = 1; j < 4; j++){
        if($("#row4 #col"+j+" ."+ringType).css("border-left-color") == "rgb(2, 104, 132)"){
          $("#row4 #col"+j+" ."+ringType).css("border-color", "#846a3f");
          break;
        }
      }
      break;
    case "red":
      for(let i = 1; i < 4; i++){
        if($("#row"+i+" #col0 ."+ringType).css("border-left-color") == "rgb(183, 44, 44)"){
          $("#row"+i+" #col0 ."+ringType).css("border-color", "#846a3f");
          break;
        }
      }
      break;
    case "green":
      for(let i = 1; i < 4; i++){
        if($("#row"+i+" #col4 ."+ringType).css("border-left-color") == "rgb(60, 178, 1)"){
          $("#row"+i+" #col4 ."+ringType).css("border-color", "#846a3f");
          break;
        }
      }
      break;
  }
}

function checkWin(){
  var rings = [".large-ring", ".middle-ring", ".small-ring"];
  
  //check small, med, large are same color
  for(let i = 1; i < 4; i++){
    for(let j = 1; j < 4; j++){
      if($("#row"+i+" #col"+j+" .large-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row"+i+" #col"+j+" .large-ring").css("border-left-color") == $("#row"+i+" #col"+j+" .middle-ring").css("border-left-color") && $("#row"+i+" #col"+j+" .large-ring").css("border-left-color") == $("#row"+i+" #col"+j+" .small-ring").css("border-left-color")){
        return [true, $("#row"+i+" #col"+j+" .large-ring").css("border-left-color")] ;
      }
    }
  }
  
  //check same size same color horizontal
  for(const ring of rings){
    for(let i = 1; i < 4; i++){
      if($("#row"+i+" #col1 "+ring).css("border-left-color") != "rgb(132, 106, 63)" && $("#row"+i+" #col1 "+ring).css("border-left-color") == $("#row"+i+" #col2 "+ring).css("border-left-color") && $("#row"+i+" #col1 "+ring).css("border-left-color") == $("#row"+i+" #col3 "+ring).css("border-left-color")){
        return [true, $("#row"+i+" #col1 "+ring).css("border-left-color")];
      }
    }
  }
  
  //check same size same color vertical
  for(const ring of rings){
    for(let j = 1; j < 4; j++){
      if($("#row1 #col"+j+" "+ring).css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col"+j+" "+ring).css("border-left-color") == $("#row2 #col"+j+" "+ring).css("border-left-color") && $("#row1 #col"+j+" "+ring).css("border-left-color") == $("#row3 #col"+j+" "+ring).css("border-left-color")){
        return [true, $("#row1 #col"+j+" "+ring).css("border-left-color")];
      }
    }
  }
  
  //check same size same color diagonal
  for(const ring of rings){
    if($("#row1 #col1 "+ring).css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col1 "+ring).css("border-left-color") == $("#row2 #col2 "+ring).css("border-left-color") && $("#row1 #col1 "+ring).css("border-left-color") == $("#row3 #col3 "+ring).css("border-left-color")){
      return [true, $("#row1 #col1 "+ring).css("border-left-color")];
    }
    if($("#row1 #col3 "+ring).css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col3 "+ring).css("border-left-color") == $("#row2 #col2 "+ring).css("border-left-color") && $("#row1 #col3 "+ring).css("border-left-color") == $("#row3 #col1 "+ring).css("border-left-color")){
      return [true, $("#row1 #col3 "+ring).css("border-left-color")];
    }
  }
  
  //check different size same color horizontal
  for(let i = 1; i < 4; i++){
    if($("#row"+i+" #col1 .large-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row"+i+" #col1 .large-ring").css("border-left-color") == $("#row"+i+" #col2 .middle-ring").css("border-left-color") && $("#row"+i+" #col1 .large-ring").css("border-left-color") == $("#row"+i+" #col3 .small-ring").css("border-left-color")){
      return [true, $("#row"+i+" #col1 .large-ring").css("border-left-color")];
    }
    if($("#row"+i+" #col1 .small-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row"+i+" #col1 .small-ring").css("border-left-color") == $("#row"+i+" #col2 .middle-ring").css("border-left-color") && $("#row"+i+" #col1 .small-ring").css("border-left-color") == $("#row"+i+" #col3 .large-ring").css("border-left-color")){
      return [true, $("#row"+i+" #col1 .small-ring").css("border-left-color")];
    }
  }
  
  //check different size same color vertical
  for(let j = 1; j < 4; j++){
    if($("#row1 #col"+j+" .large-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col"+j+" .large-ring").css("border-left-color") == $("#row2 #col"+j+" .middle-ring").css("border-left-color") && $("#row1 #col"+j+" .large-ring").css("border-left-color") == $("#row3 #col"+j+" .small-ring").css("border-left-color")){
      return [true, $("#row1 #col"+j+" .large-ring").css("border-left-color")];
    }
    if($("#row1 #col"+j+" .small-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col"+j+" .small-ring").css("border-left-color") == $("#row2 #col"+j+" .middle-ring").css("border-left-color") && $("#row1 #col"+j+" .small-ring").css("border-left-color") == $("#row3 #col"+j+" .large-ring").css("border-left-color")){
      return [true, $("#row1 #col"+j+" .small-ring").css("border-left-color")];
    }
  }
  
  //check different size same color diagonal
  if($("#row1 #col1 .large-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col1 .large-ring").css("border-left-color") == $("#row2 #col2 .middle-ring").css("border-left-color") && $("#row1 #col1 .large-ring").css("border-left-color") == $("#row3 #col3 .small-ring").css("border-left-color")){
    return [true, $("#row1 #col1 .large-ring").css("border-left-color")];
  }
  if($("#row1 #col3 .large-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col3 .large-ring").css("border-left-color") == $("#row2 #col2 .middle-ring").css("border-left-color") && $("#row1 #col3 .large-ring").css("border-left-color") == $("#row3 #col1 .small-ring").css("border-left-color")){
    return [true, $("#row1 #col3 .large-ring").css("border-left-color")];
  }
  if($("#row1 #col1 .small-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col1 .small-ring").css("border-left-color") == $("#row2 #col2 .middle-ring").css("border-left-color") && $("#row1 #col1 .small-ring").css("border-left-color") == $("#row3 #col3 .large-ring").css("border-left-color")){
    return [true, $("#row1 #col1 .small-ring").css("border-left-color")];
  }
  if($("#row1 #col3 .small-ring").css("border-left-color") != "rgb(132, 106, 63)" && $("#row1 #col3 .small-ring").css("border-left-color") == $("#row2 #col2 .middle-ring").css("border-left-color") && $("#row1 #col3 .small-ring").css("border-left-color") == $("#row3 #col1 .large-ring").css("border-left-color")){
    return [true, $("#row1 #col3 .small-ring").css("border-left-color")];
  }
  
  return [false];
}

function checkDraw(){
  return turnCounter >= 9*numPlayers; //true = draw, false = normal
}