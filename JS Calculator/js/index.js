$(document).ready(function(){
  $(".button").on("click", function(){
    if(this.id == "AC"){
      $(".stored-expression").text("0");
      $(".input-num").text("0");
    } else if(this.id == "CE"){
      if($(".input-num").text() == "0"){
        $(".stored-expression").text("0");
      } else{
        $(".stored-expression").text($(".stored-expression").text().substring(0, $(".stored-expression").text().length-$(".input-num").text().length));
        if($(".stored-expression").text() == "")
          $(".stored-expression").text("0");
      }
      $(".input-num").text("0");
    } else if(this.id == "+" || this.id == "-" || this.id == "x" || this.id == "÷" || $(".input-num").text() == "+" || $(".input-num").text() == "-" || $(".input-num").text() == "x" || $(".input-num").text() == "÷"){
      if(!((this.id == "+" || this.id == "-" || this.id == "x" || this.id == "÷" || $(".input-num").text() == "+" ) && ($(".input-num").text() == "-" || $(".input-num").text() == "x" || $(".input-num").text() == "÷"))){
        $(".input-num").text(this.id);
        $(".stored-expression").append(this.id); 
      }
    } else if(this.id == "="){
      $(".input-num").text(calc());
      $(".stored-expression").text($(".input-num").text());
    } else{
      if($(".stored-expression").text() == "0")
        $(".stored-expression").text("");
      if($(".input-num").text() == "0")
        $(".input-num").text("");
      $(".stored-expression").append(this.id);
      $(".input-num").append(this.id);
    }
  });
});

function calc(){
  var symbols = [];
  var symbolInd = [];
  var expression = $(".stored-expression").text();
  
  var re = /[+\-x\÷]/g;
  while ((match = re.exec(expression)) != null) {
    symbols.push(expression[match.index]);
    symbolInd.push(match.index);
  }
  //$(".input-num").text(JSON.stringify(symbolInd));
  if(expression[0] == "-"){
    var val1 = -parseFloat(expression.substring(1, symbolInd[1]));
    var i = 1;
  }else {
    var val1 = parseFloat(expression.substring(0, symbolInd[0]));
    var i = 0;
  }
  var val2;
  for(; i < symbols.length; i++){
    if(i < symbols.length-1){
      val2 = parseFloat(expression.substring(symbolInd[i]+1, symbolInd[i+1]));
    } else{
      val2 = parseFloat(expression.substring(symbolInd[i]+1));
    }
    val1 = compute(val1, val2, symbols[i]);
  }
  return val1;
}

function compute(val1, val2, symbol){
  if(symbol == "+")
    return val1+val2;
  else if(symbol == "-")
    return val1-val2;
  else if(symbol == "x")
    return val1*val2;
  else
    return val1/val2;
}