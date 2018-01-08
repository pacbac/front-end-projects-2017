var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "mang0", "Dreamhacksmash", "mew2king"];

var onlineData = [];
var htmlData = [];

$(document).ready(function(){
  users.forEach(function(user){
    $.getJSON('https://api.twitch.tv/kraken/streams/'+user+'?client_id=v8xaf0ybl48gfarzmso4lokviu61dr', function(json){
      var html = "";
      var status;
      var link;
      if(json["stream"] == null){
        status = "Offline";
        $.getJSON('https://api.twitch.tv/kraken/channels/'+user+'?client_id=v8xaf0ybl48gfarzmso4lokviu61dr', function(json){
          if(json["logo"] == null){
        link = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_600x600.png";
      } else{
        link = json["logo"];
      }
          html += '<a href="https://www.twitch.tv/'+user+'" target="_blank"><div class="row offlineNow"><div class="col-sm-2"><img src="'+link+'" alt="channel-logo"></div><div class="col-sm-3"><p>'+json["display_name"]+'</p></div><div class="col-sm-7">'+status+'</div></div></a>'
          $(".stream-list").append(html);
          onlineData.push(false);
          htmlData.push(html);
        });
      } else{
        status = json["stream"]["channel"]["status"];
        if(json["stream"]["channel"]["logo"] == null){
        link = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_600x600.png";
      } else{
        link = json["stream"]["channel"]["logo"];
      }
      html += '<a href="https://www.twitch.tv/'+user+'" target="_blank"><div class="row onlineNow"><div class="col-sm-2"><img src="'+link+'" alt="channel-logo"></div><div class="col-sm-3"><p>'+json["stream"]["channel"]["display_name"]+'</p></div><div class="col-sm-7">'+status+'</div></div></a>'
      $(".stream-list").append(html);
        onlineData.push(true);
        htmlData.push(html);
      }
    });
  });
  
  $(".all").on("click", function(){
    $(".stream-list").html("");
    for(var i = 0; i < onlineData.length; i++){
      $(".stream-list").append(htmlData[i]);
    }
  });
  
  $(".online").on("click", function(){
    $(".stream-list").html("");
    for(var i = 0; i < onlineData.length; i++){
      if(onlineData[i])
        $(".stream-list").append(htmlData[i]);
    }
  });
  
  $(".offline").on("click", function(){
    $(".stream-list").html("");
    for(var i = 0; i < onlineData.length; i++){
      if(!onlineData[i])
        $(".stream-list").append(htmlData[i]);
    }
  });
});