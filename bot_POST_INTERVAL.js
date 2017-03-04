console.log("Twitter bot started for POST requests with setInterval() ! \n ");

/*you can publish THIS 'bot.js' source code and hide config file with acces tokens*/
var config = require('./config');  // takes acces tokens from file 'config.js' file

var Twit = require('twit');
var T = new Twit(config); //make a new Twit object --> it gets acces tokens from var 'config'



// function call that posts a tweet for first time, next comes after intervall times (every 15 minute)
tweetIt();

/*
call the function tweetIt every 15 minutes
1000 miliseconds --> 1 sec
post very 60 seconds: 1000milisec * 60 --> 60 000 milisec --> 60 sec
post every 15...* minutes :
tweetIt, 1000 milisec * 60 *15 --> 60 000 milisec * 15
-->  900 000 milisec --> 900 sec --> 15 min
*/
setInterval(tweetIt, 1000*60*15);


// the whole posting packed in a function
function tweetIt() {

/*
Math.random()                            --> 0.8317520615413754, 0.6517450805630967 ...
Math.random()*10                       --> 8.317520615413754, 6.517450805630967 ...
Math.random()*100                     --> 83.17520615413754, 65.17450805630967 ...
Math.floor(Math.random()*100)   --> 83, 65 ...
*/

                        /* The floor() method rounds a number DOWNWARDS
                            to the nearest integer, and returns the result.
                        */
                        var r = Math.floor(Math.random()*100);

                        // in var 'tweet' is the actual text, that will be tweeted
                        var tweet = {
                        status: 'Here is a random number ' +  r + ' #erictrump'
                        }

                        /*
                        @param tweet --> object with parameters what we want to tweet
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


}
