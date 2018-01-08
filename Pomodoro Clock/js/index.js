$(document).ready(function(){
  var countDown;
  $(".timer").css("height", $(".timer").width());
  var setBreak = parseInt($("#break").text());
  var setSession = parseInt($("#session").text());
  var isSession = true;
  var start = false;
  var restart = true;
  $("button.col-3").on("click", function(){
    if(this.id == "break-minus" && setBreak > 1){
      setBreak--;
      $("#break").text(setBreak);
      if(!isSession){
        $("h2.time").text(setBreak);
        restart = true;
        clearInterval(countDown);
      }
    } else if(this.id == "break-plus"){
      setBreak++;
      $("#break").text(setBreak);
      if(!isSession){
        $("h2.time").text(setBreak);
        restart = true;
        clearInterval(countDown);
      }
    } else if(this.id == "session-minus" && setSession > 1){
      setSession--;
      $("#session").text(setSession);
      if(isSession){
        $("h2.time").text(setSession);
        restart = true;
        clearInterval(countDown);
      }
    } else if(this.id == "session-plus"){
      setSession++;
      $("#session").text(setSession);
      if(isSession){
        $("h2.time").text(setSession);
        restart = true;
        clearInterval(countDown);
      }
    }
  });
  var time;
  var totalTime;
  $(".timer").on("click", function(){
    start = !start;
      if(isSession && restart)
        time = totalTime = parseInt($("#session").text()*60*100);
    else if(restart)
        time = totalTime = parseInt($("#break").text()*60*100);
    
    function decrementTime(){
      if(time == 0){
        clearInterval(countDown);
        isSession = !isSession;
        if(isSession){
          time = totalTime = parseInt($("#session").text()*60*100);
          $("h2.label").text("SESSION");
          $(".timer").css("border-color", "#14a008");
          $(".hourglass").css("background-color", "#42f459");
        } else{
          time = totalTime = parseInt($("#break").text()*60*100);
          $("h2.label").text("BREAK");
          $(".timer").css("border-color", "#db411e");
          $(".hourglass").css("background-color", "#e54747");

        }
        countDown = setInterval(decrementTime, 10);
      } else {
        time--;
        $(".time").text(convertTime(time));
        var ratio = parseInt(100*(totalTime - time)/totalTime)
        $(".hourglass").css("height", ratio+"%");
      }
    }
    
    if(start){
      countDown = setInterval(decrementTime, 10);
      restart = false;
    } else
      clearInterval(countDown);
  });
});

function convertTime(time){
  var hr = Math.floor(time/3600/100);
  var min = Math.floor(((time/100)%3600)/60);
  var sec = Math.floor(((time/100)%3600)%60);
  //min+=Math.floor(time%60);
  if(sec < 10)
    sec = "0"+sec;
  if(min < 10)
    min = "0"+min;
  if(hr == 0)
    return min+":"+sec;
  else
    return hr+":"+min+":"+sec;
}