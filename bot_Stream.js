console.log('The follow bot is starting');


/*you can publish THIS 'bot.js' source code and hide config file with acces tokens*/
var config = require('./config');  // takes acces tokens from file 'config.js' file

var Twit = require('twit');
var T = new Twit(config); //make a new Twit object --> it gets acces tokens from var 'config'

/*
_______________________________________________________________________
YOU GET SOME METADATA AND POST BACK SOME ANSWER
--> if somebody follows you, you post her/his name and a message
*/

/* Setting up a user stream. the 'T' is a refference to
the Twit package API
*/
var stream = T.stream('user');

/* Anytime someone 'follow's me, the next code will be executed.
   function '.on('follow', followed)'' assigns a callback, everytime someone follows me
   and calls 'followed(eventMsg)'' function down below.
   possible other variations 'stream.on('follow',..)', 'stream.on('retweet',...)''
*/
stream.on('follow', followed);

/* callback reaction --> you pass an argument.
  @argument 'eventMsg'  steht fuer 'event Message''
*/
function followed(eventMsg) {
                console.log("Following event!");
                /*
                eventsMsg - event message json data, that has all data associated
                with that particular event
                --> we take out from the Json data the users 'name' and 'screen_name'
                */
                var name = eventMsg.source.name;
                var screenName = eventMsg.source.screen_name;
                /*
                calling tweetIt() function with var 'screenName', in which is the
                extracted 'screen_name' from user saved.
                So we tweet that, with some text.
                */
                tweetIt('.@' + screenName + ' do you like rainbows?');
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
