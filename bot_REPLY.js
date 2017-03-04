console.log('The reply bot is starting');


/*you can publish THIS 'bot.js' source code and hide config file with acces tokens*/
var config = require('./config');  // takes acces tokens from file 'config.js' file

var Twit = require('twit');
var T = new Twit(config); //make a new Twit object --> it gets acces tokens from var 'config'

/* Setting up a user stream. the 'T' is a refference to
the Twit package API
*/
var stream = T.stream('user');

stream.on( 'tweet', tweetEvent );

function tweetEvent(eventMsg) {
            /*
            we dont need this after we once used this to
            get the json file saved on local disk

            // node module fs --> file system
            // allows to read and write from local hard drive
            // var fs = require('fs');
            // taking a javascript object (here eventMsg)
            // and turning it into a string
            // var json = JSON.stringify(eventMsg, null, 2);
            // saving JSON string as file 'tweet.json'
            // fs.writeFile("tweet.json", json);

            */

            // get specific info from downloaded json file out.
            var replyto = eventMsg.in_reply_to_screen_name;
            var text = eventMsg.text;
            // username of other twitter user
            var from = eventMsg.user.screen_name;

            // to see who sent the tweet to me
            console.log(replyto + '  ' + from');

             // i just reply, if tweet is meant to
             // me(twitter username)
            if (replyto === 'happy_watson2') {
                    var newTweet = '@' + from + ' thanks for mentioning me! :)' ;
                    // calling function to tweet my reply
                    tweetIt(newTweet);
            }
}

/* @param 'txt' --> the passed text to tweet */
function tweetIt(txt) {
                // the passed content of variable txt is saved in status
                var tweet = {
                  status: txt
                }

                /*
                  @param tweet --> object with parameters what we want to tweet
                  @param tweeted --> callback, reacting on answer --> printig answer out
                */
                T.post('statuses/update', tweet, tweeted);
                             // our error message
                function tweeted(err, data, response) {
                  if (err) {
                    console.log("Something went wrong!");
                  } else {
                    console.log("It worked!");
                  }
                }
}
