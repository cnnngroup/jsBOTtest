console.log("Twitter bot started for POST requests! \n ");
/*
LIMITS for post 'statuses/update':
Rate limited?   Yes
how much? no information
*/

/*you can publish THIS 'bot.js' source code and hide config file with acces tokens*/
var config = require('./config');  // takes acces tokens from file 'config.js' file

var Twit = require('twit');
var T = new Twit(config); //make a new Twit object --> it gets acces tokens from var 'config'



/*
---------------------------------------------------------------------------------------------------------------
original line of code:

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)})
*/



/*
---------------------------------------------------------------------------------------------------------------
 modified line of code:
*/

/*tweet object --> content, that we will tweet --> example: 'I can code! #codingisfun'
 wen can add more than just a 'status', even media files like pictures
*/
    var tweet = {
    status: ' Business, unfortunately, isn\'t all sunshine and lollipops. #erictrump #business'
    }

/* @param tweet --> object with parameters what we want to tweet
   @param tweeted --> callback, reacting on answer --> printig answer out
*/
T.post('statuses/update', tweet, tweeted);

/* our callback function 'tweeted' --> we react on error
   we dont need it, because we post, but for errors its good to have
*/
function tweeted(err, data, response) {
                    // our error message
            if (err) {
                    console.log("Something went wrong! \n ");
            } else {
             console.log("it worked \n !");
            }
}




