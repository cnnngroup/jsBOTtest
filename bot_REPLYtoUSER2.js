/*
Functionality: A bot that allows a user to tweet a custom message to a given @TwitterHandle, with a custom message.

Functions: The tweetEvent() function, given the eventMsg parameter, is a callback function that is invoked when there is 
a new tweet found on the stream. tweetEvent() then analyzes the tweet by checking whether if the tweet was posted by the 
person we arelooking for.And if it is, it will increment count, which keeps track of the number of iterations, but also 
allows us to give our Tweet a unique string to avoid collision. It's necessary to avoid collisions because Twitter will 
only allow unique tweets to be posted within a 24-hour time-frame.Finally, if tweetEvent() found that it was in fact the 
person that we are looking for, it will then invoke tweetIt() which takes parameters 'txt'(the message we want to tweet 
to the user tweeting) and 'eventMsg'. The latter is necessary because we want to be able to reply back to the tweet 
instead of simply tweeting the person(which won't show under the tweet).

How to run the program:

1) Make sure that you've correctly configured your Twitter Keys and node, which can be done by following Daniel Shiffman's 
first three videos in the playlist.

2) Modify the program by changing 'var userToMatch' to @some_username WITHOUT THE @ JUST THE USERNAME

3) Customize the tweet to send to the user by modifying 'var stringToTweet'

4) Finally, be sure to remember that Twitter's limit is still 140 characters, to avoid errors, make sure your string is 
less than 140 characters by taking the length of your 'stringToTweet' and subtract it by the length of 'userToMatch'

5) Once everything is all set up, go to your working directly and enter the command : node replyBot.js
*/

console.log("Reply to @user bot is now starting . . .\n");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

var stream = T.stream('user');
stream.on('tweet', tweetEvent);

count = 0;
function tweetEvent(eventMsg) {

  var userToMatch = '@USERTOMENTION';
  var text = eventMsg.text;
  var personTweeting = eventMsg.user.screen_name;
  var stringToTweet = 'insert string here';

  if (personTweeting.toLowerCase() === userToMatch.toLowerCase()) {
    count++;
    console.log('@' + personTweeting + ' has tweeted!');
    var toSend = '@' + personTweeting + ' Attempt #' + count + ' INSERT STRING HERE';
    tweetIt(toSend, eventMsg);
  }
}
function tweetIt(txt, eventMsg){
  var tweet = {
    status: txt,
    in_reply_to_status_id: eventMsg.id_str
  }
  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err){
      console.log("ERROR: Failed to tweet post.");
    } else {
      console.log("Successfully tweeted: " + tweet.status + "\n");
    }
  }
}
