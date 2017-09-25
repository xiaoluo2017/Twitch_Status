var usernames = ["warcraft", "cretetion", "lirik", "ceogaming", "brawlhalla", "worldgaming", "noobs2ninjas"
,"rocketleague", "overwatchcontenders", "millennialesports", "tecnosh", "riotgames", "summit1g"
, "esl_joindotayellow", "capcomfighters", "shroud"];
var channels = "https://wind-bow.glitch.me/twitch-api/channels/";
var endpoint = "https://wind-bow.glitch.me/twitch-api/streams/";

var p1 = '<div class="picture"><a target="_blank" href="'; // p1&p2 href
var p1b = '<div><a class="offline" target="_blank" href="'; // for offline situation
var p2 = '"><img src="'; // p2&p3 img src
var p3 = '" alt="'; // p3&p4 img alt
var p4 = '" class="img-fluid"></a></div><div class="letter"><p>'; // p4&p5 p
var p4b = '" class="img-fluid"></a><span class="off_tip">OffLine</span></div><div class="letter"><p>'; // for offline situation
var p5 = '</p><span>'; // p5&p6 number 
var p6 = ' viewers on '; // p6&p7 platform
var p6b = 'Last time: '; // for offline situation
var p7 = '</span></div>';

$(document).ready(function() {
  getList(null, 0, usernames.length - 1);
  $("#keyword").keypress(function(event){
    var val = $(this).val();
    if (event.keyCode == '13') {
      console.log("check enter");
      var start = 0, end = getEnd(val) - 1;
      emptyInterface();
      getList(val, start, end);
    }
  });
});

function truncateString(str, num) {
  if (num < str.length) {
    str = num >= 3 ? str.substring(0, num - 3) + "..." : str.substring(0, num) + "...";
  }
  return str;
}

function getList(val, start, end) {
  for (var i = 0; i < usernames.length; i++) {
    if (val != null && usernames[i].indexOf(val) === -1) continue;
    (function(i) {
      $.getJSON(endpoint + usernames[i], function(json) {
        if (json.stream !== null) {
          var url = json.stream.channel.url;
          var img = json.stream.channel.video_banner;
          var name = truncateString(json.stream.channel.status, 45);
          var num = json.stream.viewers;
          var display_name = json.stream.channel.display_name;
          $("#video_" + start).html(p1 + url + p2 + img + p3 + p4 + name + p5 + num + p6 + display_name + p7);
          start++;
        } else {
          $.getJSON(channels + usernames[i], function(json) {
            var url = json.url;
            var img = json.video_banner;
            var name = json.display_name;
            var updated_at = json.updated_at;
            $("#video_" + end).html(p1b + url + p2 + img + p3 + p4b + name + p5 + p6b + updated_at + p7);
            end--;
          });
        }
      });
    })(i); 
  }
} 

function getEnd(val) {
  if (val == null) return usernames.length;
  var cnt = 0;
  for (var i = 0; i < usernames.length; i++) {
    if (usernames[i].indexOf(val) !== -1) {
      cnt++;
    }
  }
  return cnt;
}

function emptyInterface() {
  for (var i = 0; i < usernames.length; i++) {
    $("#video_" + i).html("");
  }
}
