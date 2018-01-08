var chalkColor = "white";
var canvas = document.getElementsByTagName("canvas")[0];
var canvastx = canvas.getContext('2d');
var mousePress = false;

$(document).ready(function(){
  setupSlider();
  setupCanvas();
  $(".element").on("click", function(){
    $(".selected").removeClass("selected");
    $("#"+this.id).addClass("selected");
  });
  
  $(".clear").on('click', function(){
    canvastx.fillStyle = "#161616";
    canvastx.fillRect(0, 0, $('canvas').width(), $('canvas').height());
  });
  // when mouse button is clicked and held    
  $('canvas').on('mousedown', function(e){
    mousePress = true; //indicate mouse click is held down
    markCanvas(e);
  });
  
  //when the mouse moves
  $('canvas').mousemove(function(e){
    if(mousePress) //if clicked down and mouse is dragged, mark canvas
      markCanvas(e);
  });
  
  $('canvas').on('mouseup', function(){
    mousePress = false; //mouse click no longer held down
  });
  
  $("#scale-slider").on('input', function(){
    $(this).trigger('change');
  });
  
  $("#scale-slider").change(function(){
    $(".sizer").width(30 - 0.3*$(this).val());
    $(".sizer").height(30 - 0.3*$(this).val());
    $(".sizer").css("margin-top", $("#scale-slider").width()+25);
  });
  
});

function setupSlider(){
  var scaleSliderW = $(".row2").height()*0.6;
  var scaleSliderH = 10;
  $("#scale-slider").width(scaleSliderW);
  $("#scale-slider").height(scaleSliderH);
  $("#scale-slider").css("left", Math.floor(scaleSliderW/-2.75)+"px");
  $(".sizer").css("margin-top", $("#scale-slider").width()+25);
}

function setupCanvas(){
  canvas.width = $("body").width()-$(".toolbar").width();
  canvas.height = $("body").height();
}

// get mouse pos relative to canvas (yours is fine, this is just different)
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function markCanvas(e){
  var pos = getMousePos(canvas, e);
    var r, g, b, a;
    switch($('.selected')[0].id){
      case "white":
        r = 255;
        g = 255;
        b = 255;
        a = 255;
        break;
      case "red":
        r = 255;
        g = 0;
        b = 0;
        a = 255;
        break;
      case "green":
        r = 0;
        g = 255;
        b = 0;
        a = 255;
        break;
      case "blue":
        r = 0;
        g = 0;
        b = 255;
        a = 255;
        break;
      case "eraser":
        r = g = b = 22;
        a = 255;
        break;
      default:
        r = 0;
        g = 0;
        b = 0;
        a = 0;
        break;
    }
    canvastx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
    canvastx.beginPath();
    canvastx.arc(pos.x, pos.y, $(".sizer").width()/2, 0, 2*Math.PI);
    canvastx.fill();
}