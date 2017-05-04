var player = videojs('#my-video', {
  controls: true,
  autoplay: true,
  preload: 'auto'
});

//Adapted from: https://github.com/spchuang/videojs-markers
// var markers = [
//   {time: 13, text: "advance is OK, knees could be more bent, maintain more distance between front and back foot", 
//   coach: "Clinton", end_time: 16},
//   {time: 18,  text: " advance + lunge, too slow", coach: "Kennedy", end_time: 23},
//   {time: 39,text: "twitched before lunge. lunge bad, want arms to help", coach: "Clinton", end_time: 44},
//   {time: 51,  text: " too many advances", coach: "Clinton", end_time: 56},
//   {time: 131,  text: "advance, feet come too close together, basically walking in a straight line", coach: "Kennedy", end_time: 136},
//   {time: 165,  text: "flèche try, didn’t work out, PARRIED ", coach: "Clinton", end_time: 170},
//   {time: 183,  text: "lunge, too low on the knees, leg movement is too exaggerated, trying to feint", coach: "Kennedy", end_time: 188},
//   {time: 207,  text: "body too leaned forward", coach: "Clinton", end_time: 212},
//   {time: 219,  text: "bad lunge, ankle folded underneath, could lead to injury, back foot should not leave ground", coach: "Clinton", end_time: 224},
//   {time: 260,  text: "feet are too close, can’t retreat from this position", coach: "Clinton", end_time: 265},
//   {time: 299,  text: " please do not kick your opponent", coach: "Kennedy", end_time: 304},
//   {time: 350,  text: " bad fleche, don’t collide into your opponent. why did you take a knee?", coach: "Kennedy", end_time: 355}
// ];

//load the marker plugin
player.markers({
  markerStyle: {
   'background-color': '#31cbd5'
  },
  markerTip:{
     display: true,
     text: function(marker){
        return Math.floor(marker.time/60) + ":" + marker.time%60;
     },
     time: function(marker) {
         return marker.time;
      }
  },

  onMarkerReached: function(marker) {
    condenseComments();
    $(this).removeClass("truncate");
    $(this).css("background-color", "#CCFFFF");
    expandComment(marker.time);
    player.play();



    setTimeout(function(){
      // condense this comment
      $("#" + marker.time).addClass("truncate");
      $("#" + marker.time).removeAttr("style", "background-color");
      $("#compare-btn" + marker.time).css("display", "none");
      $("#coach-contact" + marker.time).css("display", "none");

    }, 4000);
  },
  markers: markers
});

//pausing player
player.pause();

// insert marker list
for(var i =0; i < markers.length; i++){
   var item = $("<div class='comment-text truncate' id='" + markers[i].time + "' data-index='"+i+"'>"+ Math.floor(markers[i].time/60) + ":" + formatMinutes(markers[i].time%60) + ": " + markers[i].text+"</div><div class='coach-contact' id='coach-contact" + markers[i].time +"'style='display:none'>Posted by "+ markers[i].coach + "</div><button class='btn btn-info compare-btn' id='compare-btn" + markers[i].time + "' style='display:none'>Compare Self to Pro</button>");
   $("#comments").append(item);
}

// set up click event
$(".comment-text").click(function() {
   condenseComments();
   var index = $(this).data("index");
   var markerTime = markers[index].time;
   
   expandComment(markerTime);
   player.play();
});

function formatMinutes(minutes) {
  if (minutes < 10) {
    return "0"+minutes;
  }
  return minutes;
}

function condenseComments() {
  $(".comment-text").addClass("truncate");
  $(".comment-text").removeAttr("style", "background-color");
  $(".compare-btn").css("display", "none");
  $(".coach-contact").css("display", "none");
}

function expandComment(markerTime) {
  $("#compare-btn" + markerTime).css("display", "block");
  player.currentTime(markerTime);
  $("#coach-contact" + markerTime).css("display", "block");
  $('#comments').scrollTo($('#' + markerTime));
  $("#" + markerTime).removeClass("truncate");
  $("#" + markerTime).css("background-color", "#CCFFFF");
}