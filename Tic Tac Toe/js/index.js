var numPlayers;
var player1Symbol;
var cpuSymbol;
var firstScore = 0;
var secondScore = 0;
var board = [];
for(let i = 0; i < 3; i++){
    board.push([]);
    for(let j = 1; j < 4; j++)
      board[i].push("square"+(3*i+j));
}
var availableSq = [];
for(let i = 1; i < 10; i++)
  availableSq.push("square"+i);

$(document).ready(function(){
  $('#prompt, .col6, .score, .col-4, .title').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $("#prompt, .col-6, .score, .col-4, .title").removeClass("animated fadeIn");
  });
  
  $(".player").on("click", function(){
    if(this.id == "option1")
      numPlayers = 1;
    else
      numPlayers = 2;
    symbolSelect();
  });
});

function symbolSelect(){
  $("#prompt").addClass("animated fadeIn");
  $(".col-6").addClass("animated fadeIn");
  if(numPlayers == 1){
    $("#prompt").text("Which symbol would you like?");
  } else
    $("#prompt").text("Player 1: Which symbol would you like?");
  
  $(".row1").html('<div id="letter1" class="symbol col-6 animated fadeIn"></div><div id="letter2" class="symbol col-6 animated fadeIn"></div>');
  $("#letter1").text("X");
  $("#letter2").text("O");
  
  $(".symbol").on("click", function(){
      if(this.id == "letter1"){
        player1Symbol = "X";
        cpuSymbol = "O";
      } else {
        player1Symbol = "O";
        cpuSymbol = "X";
      }
      setUpBoard();
      if(numPlayers == 1){
        OnePGame();
      } else{
        TwoPGame();
      }
    });
}

function OnePGame(){
  $("#firstScore").addClass("animated fadeIn");
  $("#firstScore").text("Player 1: "+firstScore);
  $("#secondScore").addClass("animated fadeIn");
  $("#secondScore").text("CPU: "+secondScore);
  var firstTurnWho = Math.random() > 0.5;
  if(!firstTurnWho){
    $(".title").addClass("animated fadeIn");
    $(".title").text("CPU:");
    $("#overlay1").css("z-index", 1);
    $(".overlay").css("border-color", "#910101");
    setTimeout(cpuChoose, 1500);
  } else{
    $(".title").addClass("animated fadeIn");
    $(".title").text("Player 1:");
    $(".overlay").css("border-color", "#010f8c");
  }
  //true = p1, false = CPU
  $(".col-4").on("click", function(){
    if(availableSq.indexOf(this.id) >= 0){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(board[i][j] == this.id)
            board[i][j] = player1Symbol;
        }
      }
      updatePos(this.id, player1Symbol);
      if(checkWin()[0]){
        verifyWin();
        return;
      }
      $(".title").addClass("animated fadeIn");
      $(".title").text("CPU:");
      $(".overlay").addClass("animated fadeIn");
      $(".overlay").css("border-color", "#910101");
      $("#overlay1").css("z-index", 1);
      setTimeout(cpuChoose, 1500);
      verifyWin();
    }
  });
}

function TwoPGame(){
  $("#firstScore").text("Player 1: "+firstScore);
  $("#secondScore").text("Player 2: "+secondScore);
  $(".title").addClass("animated fadeIn");
  $(".title").text("Player 1:");
  $(".overlay").addClass("animated fadeIn");
  $(".overlay").css("border-color", "#010f8c");
  //true = p1, false = CPU
  $(".col-4").on("click", function(){
    var isP1 = $(".title").text() == "Player 1:";
    if(availableSq.indexOf(this.id) >= 0){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(board[i][j] == this.id){
            if(isP1)
              board[i][j] = player1Symbol;
            else
              board[i][j] = cpuSymbol;
          }
        }
      }
      if(isP1)
        updatePos(this.id, player1Symbol);
      else
        updatePos(this.id, cpuSymbol);
      verifyWin();
      if(isP1){
        $(".title").addClass("animated fadeIn");
        $(".title").text("Player 2:");
        $(".overlay").addClass("animated fadeIn");
        $(".overlay").css("border-color", "#910101");
      } else{
        $(".title").addClass("animated fadeIn");
        $(".title").text("Player 1:");
        $(".overlay").addClass("animated fadeIn");
        $(".overlay").css("border-color", "#010f8c");
      }
    }
  });
}

function cpuChoose(){
  //check vert
  for(let i = 0; i < 3; i++){
    if(board[0][i] == board[2][i] && availableSq.indexOf("square"+(4+i)) >= 0){
      board[1][i] = cpuSymbol;
      updatePos("square"+(4+i), cpuSymbol);
      verifyWin();
      $(".title").text("Player 1:");
      $(".overlay").css("border-color", "#010f8c");
      $("#overlay1").css("z-index", 0);
      return;
    } else if(board[0][i] == board[1][i] && availableSq.indexOf("square"+(7+i)) >= 0){
      board[2][i] = cpuSymbol;
      updatePos("square"+(7+i), cpuSymbol);
      verifyWin();
      $(".title").text("Player 1:");
      $(".overlay").css("border-color", "#010f8c");
      $("#overlay1").css("z-index", 0);
      return;
    } else if(board[1][i] == board[2][i] && availableSq.indexOf("square"+(1+i)) >= 0){
      board[0][i] = cpuSymbol;
      updatePos("square"+(1+i), cpuSymbol);
      verifyWin();
      $(".title").text("Player 1:");
      $(".overlay").css("border-color", "#010f8c");
      $("#overlay1").css("z-index", 0);
      return;
    }
  }
  //check horizontal
  for(let i = 0; i < 3; i++){
    if(board[i][0] == board[i][2] && availableSq.indexOf("square"+(3*i+2)) >= 0){
      board[i][1] = cpuSymbol;
      updatePos("square"+(3*i+2), cpuSymbol);
      verifyWin();
      $(".title").text("Player 1:");
      $(".overlay").css("border-color", "#010f8c");
      $("#overlay1").css("z-index", 0);
      return;
    } else if(board[i][0] == board[i][1] && availableSq.indexOf("square"+(3*i+3)) >= 0){
      board[i][2] = cpuSymbol;
      updatePos("square"+(3*i+3), cpuSymbol);
      verifyWin();
      $(".title").text("Player 1:");
      $(".overlay").css("border-color", "#010f8c");
      $("#overlay1").css("z-index", 0);
      return;
    } else if(board[i][1] == board[i][2] && availableSq.indexOf("square"+(3*i+1)) >= 0){
      board[i][0] = cpuSymbol
      updatePos("square"+(3*i+1), cpuSymbol);
      verifyWin();
      $(".title").text("Player 1:");
      $(".overlay").css("border-color", "#010f8c");
      $("#overlay1").css("z-index", 0);
      return;
    }
  }
  //check diagonal
  if(board[0][0] == board[2][2] || board[0][2] == board[2][0] && availableSq.indexOf("#square5") >= 0){
    board[1][1] = cpuSymbol;
    updatePos("square5", cpuSymbol);
  } else if(board[0][0] == board[1][1] && availableSq.indexOf("square9") >= 0){
    board[2][2] = cpuSymbol;
    updatePos("square9", cpuSymbol);
  } else if(board[0][2] == board[1][1] && availableSq.indexOf("square7") >= 0){
    board[2][0] = cpuSymbol;
    updatePos("square7", cpuSymbol);
  } else if(board[2][0] == board[1][1] && availableSq.indexOf("square3") >= 0){
    board[0][2] = cpuSymbol;
    updatePos("square3", cpuSymbol);
  } else if(board[2][2] == board[1][1] && availableSq.indexOf("square1") >= 0){
    board[0][0] = cpuSymbol;
    updatePos("square1", cpuSymbol);
  } else if(availableSq.length > 0){
    let randNum = Math.floor(availableSq.length*Math.random());
    $("#"+availableSq[randNum]).text(cpuSymbol);
    $("#"+availableSq[randNum]).off("click");
    var squareNum = parseInt(availableSq[randNum][availableSq[randNum].length-1]);
    var row = Math.ceil(squareNum/3)-1;
    var col = (squareNum-3*row)-1;
    board[row][col] = cpuSymbol;
    availableSq.splice(randNum, 1);
  }
  verifyWin();
  $(".title").addClass("animated fadeIn");
  $(".title").text("Player 1:");
  $(".overlay").css("border-color", "#010f8c");
  $("#overlay1").css("z-index", 0);
}

function verifyWin(){
  var isWin = checkWin();
  
  var returnBack = function(){
    $("#overlay2").text("");
    $(".col-4").text("");
    $("#overlay2").css("background-color", "Transparent");
    $("#overlay2").css("z-index", 0);
    board = [];
    for(let i = 0; i < 3; i++){
      board.push([]);
      for(let j = 1; j < 4; j++)
        board[i].push("square"+(3*i+j));
    }
    
    availableSq = [];
    for(let i = 1; i < 10; i++)
      availableSq.push("square"+i);
    if(numPlayers == 1)
      OnePGame();
    else
      TwoPGame();
  }
  
  if(isWin[0]){
    $("#overlay2").addClass("animated fadeIn");
    $("#overlay2").css("background-color", "rgba(0,0,0,0.75)");
    $("#overlay2").css("z-index", 1);
    if(isWin[1] == player1Symbol){
      $("#overlay2").text("Player 1 wins!");
      firstScore++;
      $("#firstScore").addClass("animated fadeIn");
      $("#firstScore").text("Player 1: "+firstScore);
    } else{
      secondScore++;
      $("#secondScore").addClass("animated fadeIn");
      if(numPlayers == 1){
        $("#overlay2").text("CPU wins!");
        $("#secondScore").text("CPU: "+secondScore);
      } else{
        $("#overlay2").text("Player 2 wins!");
        $("#secondScore").text("Player 2: "+secondScore);
      }
    }
    setTimeout(returnBack, 2000);
  } else if(availableSq.length === 0){
    $("#overlay2").addClass("animated fadeIn");
    $("#overlay2").css("background-color", "rgba(0,0,0,0.75)");
    $("#overlay2").css("z-index", 1);
    $("#overlay2").text("It was a draw...");
    $(".overlay").addClass("animated fadeIn");
    $(".overlay").css("border-color", "white");
    setTimeout(returnBack, 2000);
  }
}

function checkWin(){
  //check horizontal
  for(let i = 0; i < board.length; i++){
    if(board[i][0] === board[i][1] && board[i][1] === board[i][2])
      return [true, board[i][0]];
  }
  //check vert
  for(let i = 0; i < board.length; i++){
    if(board[0][i] === board[1][i] && board[1][i] === board[2][i])
      return [true, board[0][i]];
  }
  //check diagonal
  if(board[0][0] === board[1][1] && board[1][1] === board[2][2] || board[0][2] === board[1][1] && board[1][1] === board[2][0]){
    return [true, board[1][1]];
  }
  return [false];
}

function updatePos(id, symbol){
  $("#"+id).addClass("animated fadeIn");
  $("#"+id).text(symbol);
  $("#"+id).off("click");
  availableSq.splice(availableSq.indexOf(id), 1);
  $(".title").addClass("animated fadeIn");
}

function setUpBoard(){
  $(".scoreboard p").text("");
  var html = '<div class="overlay" id="overlay1"></div><div class="overlay" id="overlay2"></div><h1 class="title"></h1>';
  html += '<div class="board">';
  for(let i = 1; i < 4; i++){
    html+='<div class="row row2">';
    for(let j = 1; j < 4; j++){
      html+='<div id="square'+(3*(i-1)+j)+'" class="col-4"></div>';
    }
    html+='</div>';
  }
  html += '</div>';
  $(".col-4").css("line-height", $(".col-4").height());
  $(".screen").html(html);
}