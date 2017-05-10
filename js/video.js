var player = videojs('#my-video', {
  controls: true,
  autoplay: true,
  preload: 'auto',
  controlBar: {
    remainingTimeDisplay: false
  }
});

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
  },
  markers: markers
});

//pausing player
player.pause();

// insert marker list
for(var i =0; i < markers.length; i++){
  if (markers[i].compare) {
    var item = $("<div class='comment-text truncate' id='" + markers[i].time + "' data-index='"+i+"'>"+ Math.floor(markers[i].time/60) + ":" + formatMinutes(markers[i].time%60) + ": " + markers[i].text+"</div><div class='coach-contact' id='coach-contact" + markers[i].time +"'style='display:none'>Posted by "+ markers[i].coach + "</div><button class='btn btn-info compare-btn' id='compare-btn" + markers[i].time + "' style='display:none'>Compare Self to Pro</button>");
  } else {
    var item = $("<div class='comment-text truncate' id='" + markers[i].time + "' data-index='"+i+"'>"+ Math.floor(markers[i].time/60) + ":" + formatMinutes(markers[i].time%60) + ": " + markers[i].text+"</div><div class='coach-contact' id='coach-contact" + markers[i].time +"'style='display:none'>Posted by "+ markers[i].coach);
  }
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