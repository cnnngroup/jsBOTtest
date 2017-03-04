/*
Functionality: A bot that allows a user to instantly reply back to a tweet that they were mentioned in, with the same 
message

Functions:   tweetMention() is a callback function that takes eventMsg when a tweet is populated onto a timeline. The 
function uses regular expressions, or regex, to parse through the tweet that the user is mentioned in. If the user is 
found, the the function removes the user's @user_name from the tweet, and invokes tweetIt(). The function tweetIt() is
invoked with the two paramters, text(the text to send back to the user invoking the original tweet) and the tweet ID so 
that we are able to post a reply directly to the tweet.

How to run the program:

1) Make sure that you've correctly configured your Twitter Keys and node, which can be done by following Daniel Shiffman's 
first three videos in the playlist.

2) Modify line 15: inserting YOUR Twitter handle, i.e. @Jack. "/@ /g" lets javascript know that you're parsing a regular 
expression. So replace 'INSERT_YOUR_@NAME' on line 15 and 16 with your Twitter handle

3) For this program, we don't have to modify the text we're going to tweet out because if the user sending it to us did 
not exceed the 140 character limit, we won't either. So after completing steps 1 and 2, just run : node mimicBot.js
*/
console.log("Bot is now starting . . .");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var stream = T.stream('user');
stream.on('tweet', tweetMention);

function tweetMention(eventMsg) {
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    if (text.match(/@INSERT_YOUR_@NAME/g)) {
        text = text.replace("@INSERT_YOUR_@NAME", "");
        tweetIt('@'+ from +' ' + text, eventMsg.id_str);
    }
}
function tweetIt(txt, id){
  var tweet = {
    status: txt,
    in_reply_to_status_id: id
  }
  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err){
      console.log("Tweet did not post!");
    } else {
      console.log("Tweeted: " + tweet.status);
    }
  }
}
