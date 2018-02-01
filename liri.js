require("dotenv").config();
//link keys.js
const keys = require("./keys.js");

// take input from the command line
var userRequest = process.argv[2];
// there are four possible inputs for userRequest:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

// utilize switch to run different code for each userRequest option
switch (userRequest) {
  case "my-tweets":
    // console logs my 20 most recent lorem ipsum tweets
    var Twitter = require("twitter");
    var client = new Twitter(keys.twitter)
    var tweets = {
      user_id: 957671430455529474,
      count: 20
    }
    client.get('statuses/user_timeline', (err, tweets, response) => {
      if (err) log.info("There was an error! " + err);
      tweets.forEach(function (element) {
        console.log(`nucbc_rjp Tweet: ${element.text}
              Tweeted on ${element.created_at}
              `);
      });
    });
    break;
  case "spotify-this-song":
    //var spotify = new Spotify(keys.spotify);
    break;
  case "movie-this":

    break;
  case "do-what-it-says":

    break;
  default:
    console.log("I'm sorry...");
}