// videotutorial to this https://youtu.be/mUoIPmZ4KwA

console.log('The image bot is starting');



var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

var exec = require('child_process').exec;
var fs = require('fs');

tweetIt();
// setInterval(tweetIt, 1000*20);

function tweetIt() {
  // generates filename
  var cmd = 'processing-java --sketch=`pwd`/rainbow --run';
  exec(cmd, processing);
//  we say here --> encode image in base 64
  function processing() {
    var filename = 'rainbow/output.png';
    var params = {
      encoding: 'base64'
    }
    // reads file, encodes in base 64 and saves in variable 'b64'
    var b64 = fs.readFileSync(filename, params);
/*
we upload the image file
first you have to upload image encoded in base64 to your account on twitter
after that you can use that to upload it
*/
    T.post('media/upload', { media_data: b64 }, uploaded);


// the callback function, we tweet the uploaded image by calling this function
    function uploaded(err, data, response) {

      // we need a numeric index for the uploaded image, to refer on it.
      // this image-value is 'media_id_string' and is part of data object, that comes back.
      // we save that as 'id'
      var id = data.media_id_string;

        // this is what we will tweet later by calling 'post' function on 'T'
      var tweet = {
        status: '#codingrainbow live from node.js',
        // there could be multiple 'id'-s, so we save it in a array -->
        // media_ids: [id, id2, id3 ...]
        media_ids: [id]
      }
      // posting the tweet
      T.post('statuses/update', tweet, tweeted);

    }

    function tweeted(err, data, response) {
      if (err) {
        console.log("Something went wwrong!");
      } else {
        console.log("It worked!");
      }
    }
  }
}
