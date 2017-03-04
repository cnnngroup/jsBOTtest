console.log("Twitter bot started for GET requests! \n ");
/*
LIMITS for GET 'search/tweets':
Requests / 15-min window (user auth)  -->  180
Requests / 15-min window (app auth)   -->  450
There are two initial buckets available for GET requests:
15 calls every 15 minutes,
and
180 calls every 15 minutes.
*/

/*you can publish THIS 'bot.js' source code and hide config file with acces tokens*/
var config = require('./config');  // takes acces tokens from file 'config.js' file

var Twit = require('twit');
var T = new Twit(config); //make a new Twit object --> it gets acces tokens from var 'config'

/*here you can type in the search-phrase, you want to search
                           --> example : var searched_query = 'oscars';
*/
var searched_query = 'oscars';

/*
---------------------------------------------------------------------------------------------------------------
 original line of code:

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
 console.log(data) })
*/


/*
---------------------------------------------------------------------------------------------------------------
  modified line of code:
*/

var params =            { //first we make a banana object
        q: searched_query, // defining a phrase to search for -> saved in variable 'searched_query'
        count: 1 // look two tweets back in past, but can be more
};

/* second we make the actual get() request, asking twitter for search for tweets
  with 'search/tweets', parameters(hashtags banana and count 2) and gotData(callback 'answer' function)
*/

  //for(var t=0; t < 10;t++) {


T.get('search/tweets', params, gotData);

//the callback function --> our reaction/work with the data, we get from twitter
        function gotData(err, data, response) {
        var tweets = data.statuses; //we take object 'statuses' out from data(response) from twitter,
        //and we save as in variable 'tweets', see below 'example twitter response' for 'statuses'
                    for(var i=0;i < tweets.length; i++) {
                        console.log(tweets[i].text + '\n' );  //printing just the "text" part
                                                                            //from "statuses" (from response --> twitter json data)
                                                                            // with a new line between tweets --> '\n'
                    }
         // console.log(data) // would print the whole response(data) from twitter(json answer)
        }
//}



/*---------------------------------------------------------------------------------------------------------------
 'example  twitter response':

{ statuses:
   [ { created_at: 'Tue Feb 28 12:19:00 +0000 2017',
       id: 836551274174763000,
       id_str: '836551274174763013',
       text: 'Estupor por cómo se sienta la consejera de Trump en el Despacho Oval https://t.co/VZggOS0993 https://t.co/XEZK6zVhOO',
       truncated: false,
       entities: [Object],
       extended_entities: [Object],
       metadata: [Object],
       source: '<a href="http://dogtrack.es" rel="nofollow">DogTrack_Oficial</a>',
       in_reply_to_status_id: null,
       in_reply_to_status_id_str: null,
       in_reply_to_user_id: null,
       in_reply_to_user_id_str: null,
       in_reply_to_screen_name: null,
       user: [Object],
       geo: null,
       coordinates: null,
       place: null,
       contributors: null,
       is_quote_status: false,
       retweet_count: 0,
       favorite_count: 0,
       favorited: false,
       retweeted: false,
       possibly_sensitive: false,
       lang: 'es' },
     { created_at: 'Tue Feb 28 12:19:00 +0000 2017',
       id: 836551271750467600,
       id_str: '836551271750467584',
       text: '@StandTallTrump @rockbird1 @The_Trump_Train That\'s not very nice. Together we stand, divided we fall right?',
       truncated: false,
       entities: [Object],
       metadata: [Object],
*/
