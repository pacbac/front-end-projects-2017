$(document).ready(function(){
  $("img").width($(".search-bar input").width()/4);
  $(".search-bar").hide();
  $(".clear").hide();
  $("#search-icon").on("click", function(){
    $("#search-icon").hide();
    $(".search-bar").addClass("animated bounceIn");
    $(".search-bar").show();
    $(".clear").show();
  });
  
  $(".clear").on("click", function(e){
    e.preventDefault();
    $('input[type="text"]').val("");
    $(".search-results").html("");
  })
  $(".search-bar").keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
      $(".search-results").html("");
      var request = $('input[type="text"]').val();
      request = request.split(" ").join("_");
      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+request+"&srwhat=text&&format=json&callback=?", function(json){
        var search = json["query"]["search"];
        search.forEach(function(val){
          var resultName = val["title"].split(" ").join("_");
          var html = "<a href=http://en.wikipedia.org/wiki/"+resultName+" target='_blank'><div class='result animated slideInUp fadeIn'><h2 class='header'>"+val["title"]+"</h2>"+val["snippet"]+"</div></a>";
          $(".search-results").append(html);
        });
      });
    }
  });
});