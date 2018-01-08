$(document).ready(function(){
  $("#convertTemp").on("click", function(){
    if($("#convertTemp").text() == "°F"){
      $("#convertTemp").text("°C");
      $("#convertTemp").removeClass("btn-warning");
      $("#convertTemp").addClass("btn-primary");
      $("#temp").text(($("#temp").text().substring(0, $("#temp").text().indexOf("°"))*9/5+32).toFixed(2)+"°F");
    } else if($("#convertTemp").text() == "°C"){
      $("#convertTemp").text("°F");
      $("#convertTemp").removeClass("btn-primary");
      $("#convertTemp").addClass("btn-warning");
      $("#temp").text((($("#temp").text().substring(0, $("#temp").text().indexOf("°"))-32)*5/9).toFixed(2)+"°C");
    }
  });
  if(navigator.geolocation){
    var lat;
    var long;
  navigator.geolocation.getCurrentPosition(function(position){
      lat = position.coords.latitude;
      long = position.coords.longitude;
      getLoc(lat, long);
      getWeather(lat, long);
    });
  } else{
    $("#city").text("Not found");
  }
  
});

function getLoc(lat, long){
      //$("h4").html(lat + " and " + long)
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyBpJO_LVt6_IYO8_P5Bne2cZIz7lp8z31w", function(json){
          if(json["status"] == "OK"){
            json["results"][0]["address_components"].forEach(function(val){
              if(val["types"][0] == "city")
                $("#city").text(val["short_name"]);
              else if(val["types"][0] == "administrative_area_level_1")
                $("#state-province").text(val["short_name"]);
              else if(val["types"][0] == "country" && ($("#city").text() == "" || $("#state-province").text() == ""))
                $("#country").text(", "+val["short_name"]);
            });
          }
      //$("h4").html(json["results"][0]["address_components"][3]["types"][0]);
      });
}

function getWeather(lat, long){    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=a6d9cb83c02cd2f0ae6c4e32bc665629", function(json){
      $("#weather").text(json["weather"][0]["description"]);
      $("#wind-speed").text("Wind: "+json["wind"]["speed"]+" knots");
    $("#temp").append("<strong>"+(json["main"]["temp"]-273).toFixed(2)+"°C</strong>");
  $("#weather-icon").attr("src", "http://openweathermap.org/img/w/"+json["weather"][0]["icon"]+".png")
    $("#weather").each(function(){
    var arr = $(this).text().split(' ');
    var result = "";
    for (var x=0; x<arr.length; x++)
     result+=arr[x].substring(0,1).toUpperCase()+arr[x].substring(1)+' ';
    $(this).text(result.substring(0, result.length-1));
});
    });
}