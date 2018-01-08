var boardArr = []; //col, row (stack vertically), 0 = empty, 1 = p1, 2 = p2
var whoseTurn = Math.random() >= 0.5; //P1 is true, P2 is false
var colors = {
  "redBorder": "#910000",
  "redCenter": "#b70303",
  "blackBorder": "#0f0f0f",
  "blackCenter": "#282828"
}
var p1Symbol;
var p2Symbol;
var onePlayer = false;
var rows = 6;
var cols = 7;

$(document).ready(function(){
  console.log(4);
  $(".playerNums").on("click", function(){
    if(this.id == "1P"){
      onePlayer = true;
      $(".score-title.score2").text("CPU");
    }
    $(".prompt").text("Player 1 choose color:")
    $(".board .row").html('<div class="button color-choice col" id="black">Black</div><div class="button color-choice col" id="red">Red</div>');
    $(".button").on("click", function(){
      if(this.id == "black"){
        p1Symbol = "black";
        p2Symbol = "red";
      } else {
        p2Symbol = "black";
        p1Symbol = "red";
      }
      setUpBoard();
      playGame();
    });
  });
});

function setUpBoard(){
  $(".board").html('');
  for(let i = 0; i < rows; i++){
    $(".board").append('<div class="row row2" id="row'+i+'"></div>');
    for(let j = 0; j < cols; j++){
      $("#row"+i).append('<div class="col"><div class="slot col'+j+'"></div></div>');
    }
  }
  for(let i = 0; i < cols; i++){
    boardArr.push([]);
    for(let j = 0; j < rows; j++)
      boardArr[i].push(0);
  }
}

function playGame(){
  if(onePlayer)
    OnePlayer();
  else
    TwoPlayer();
}

function OnePlayer(){
  if(!whoseTurn){
    $(".board").parent().append('<div class="overlay">CPU is choosing...</div>');
    setTimeout(cpu, 1000);
  }
  $(".slot").on("click", function(){
    var selectedCol = Number.parseInt(this.className[this.className.length-1]);
    for(let i = rows-1; i >= 0; i--){ //i = row index
      if(boardArr[selectedCol][i] == 0){
        boardArr[selectedCol][i] = 1;
        var slot = ".board #row"+i+" .col"+selectedCol;
        $(slot).addClass("slotOccupied");
        $(slot).css("border-color", colors[p1Symbol+"Border"]);
        $(slot).css("background-color", colors[p1Symbol+"Center"]);
        break;
      }
    }
    if(!checkWin()){
      $(".board").parent().append('<div class="overlay">CPU is choosing...</div>');
      setTimeout(cpu, 1000);
    }
  });
}

function cpu(){
  var col = Math.floor(cols*Math.random());
  for(let i = rows-1; i >= 0; i--){
    if(boardArr[col][i] == 0){
      boardArr[col][i] = 2;
      var slot = ".board #row"+i+" .col"+col;
      $(slot).addClass("slotOccupied");
      $(slot).css("border-color", colors[p2Symbol+"Border"]);
      $(slot).css("background-color", colors[p2Symbol+"Center"]);
      break;
    }
  }
  $(".overlay").remove();
  setTimeout(checkWin, 50);
}

function TwoPlayer(){
  whoseTurn = true;
  $(".slot").on("click", function(){
    var selectedCol = Number.parseInt(this.className[this.className.length-1]);
    for(let i = rows-1; i >= 0; i--){ //i = row index
      if(boardArr[selectedCol][i] == 0){
        if(whoseTurn)
          boardArr[selectedCol][i] = 1;
        else
          boardArr[selectedCol][i] = 2;
        console.log(boardArr);
        var slot = ".board #row"+i+" .col"+selectedCol;
        $(slot).addClass("slotOccupied");
        if(whoseTurn){
          $(slot).css("border-color", colors[p1Symbol+"Border"]);
          $(slot).css("background-color", colors[p1Symbol+"Center"]);
        } else {
          $(slot).css("border-color", colors[p2Symbol+"Border"]);
          $(slot).css("background-color", colors[p2Symbol+"Center"]);
        }
        break;
      }
    }
    checkWin();
    whoseTurn = !whoseTurn;
  });
}

function checkWin(){
  //check vertical
  for(let i = 0; i < cols; i++){ //cols (aka boardArr rows since boardArr is inverted)
    let count = 1; //count starts at 1 because the streak starts w/ one piece
    for(let j = 0; j < rows-1; j++){ //rows
      if(boardArr[i][j] != 0 && boardArr[i][j] == boardArr[i][j+1]){
        count++;
        //check if 4 are vertically connected
        if(count >= 4){
          congrats(boardArr[i][j]);
          return true;
        }
      } else
        count = 1;
    }
  }
  
  //check horizontal
  for(let i = 0; i < rows; i++){ //rows aka boardArr cols first
    let count = 1;
    for(let j = 0; j < cols-1; j++){
      if(boardArr[j][i] != 0 && boardArr[j][i] == boardArr[j+1][i]){
        count++;
        //check if 4 are vertically connected
        if(count >= 4){
          congrats(boardArr[j][i]);
          return true;
        }
      } else
        count = 1;
    }
  }
  
  //check upward diagonals (designed wrong)
  for(let i = rows-1; i > 2; i--){ //rows aka boardArr cols first
    for(let j = 0; j < 4; j++){
      console.log([j, i, boardArr[j][i]])
      if(boardArr[j][i] != 0 && boardArr[j][i] == boardArr[j+1][i-1]
        && boardArr[j+1][i-1] == boardArr[j+2][i-2] 
        && boardArr[j+2][i-2] == boardArr[j+3][i-3]){
        congrats(boardArr[j][i]);
        return true;
      } else
        count = 1;
    }
  }
  
  //check downward diagonals (designed wrong)
  for(let i = rows-1; i > 2; i--){ //rows aka boardArr cols first
    for(let j = cols-1; j > 2; j--){
      if(boardArr[j][i] != 0 && boardArr[j][i] == boardArr[j-1][i-1]
        && boardArr[j-1][i-1] == boardArr[j-2][i-2] 
        && boardArr[j-2][i-2] == boardArr[j-3][i-3]){
        congrats(boardArr[j][i]);
        return true;
      } else
        count = 1;
    }
  }
  
  return false;
}

function congrats(winnerNum){
  if(winnerNum == 1){
    $(".board").parent().append('<div class="overlay">Player 1 wins!</div>');
  } else if(winnerNum == 2 && onePlayer){
    $(".board").parent().append('<div class="overlay">CPU wins!</div>');
  } else if(winnerNum == 2 && !onePlayer){
    $(".board").parent().append('<div class="overlay">Player 2 wins!</div>');
  }
  setTimeout(function(){
    $(".score.score"+winnerNum).text(Number.parseInt($(".score.score"+winnerNum).text())+1);
    boardArr = [];
    setUpBoard();
    $(".overlay").remove();
    if(onePlayer)
      OnePlayer();
    else
      TwoPlayer();
  }, 1000);
}