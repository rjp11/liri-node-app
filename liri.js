require("dotenv").config();
const keys = require("./keys.js");

var userRequest = process.argv[2];
var query = process.argv[3];

// utilize switch to run different code for each userRequest option
// options are: 'my-tweets' 'spotify-this-song' 'movie-this' 'do-what-it-says'
switch (userRequest) {
  case "my-tweets":
    var Twitter = require("twitter");
    var client = new Twitter(keys.twitter)
    var tweets = {
      user_id: 957671430455529474,
      count: 20
    }

    // perform Twitter API call
    client.get('statuses/user_timeline', (err, tweets, response) => {
      if (err) {
        console.log(`Error occurred: ${err}`)
      } else {
        tweets.forEach(function (element) {
          console.log(`----------------------------
        nucbc_rjp Tweet: ${element.text}
              Tweeted on: ${element.created_at}
----------------------------`);
        });
      };
    });
    break;

  case "spotify-this-song":
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    // if no song is provided, default to The Sign by Ace of Base
    if (query === undefined) {
      query = "The sign ace of base";
    };

    // perform Spotify API call
    spotify.search({
      type: 'track',
      query: `${query}`,
      limit: 1
    }, function (err, data) {
      if (err) {
        return console.log(`Error occurred: ${err}`);
      } else {
        console.log(`----------------------------
      Artist: ${data.tracks.items[0].artists[0].name}
      Album: ${data.tracks.items[0].album.name}
      Track name: ${data.tracks.items[0].name}
      Preview this track: ${data.tracks.items[0].preview_url}
----------------------------`);
      };
    });
    break;

  case "movie-this":
    // if no movie is provided, default to Mr. Nobody
    if (query === undefined) {
      query = "Mr. Nobody";
    };

    var request = require("request");
    // perform OMBD API call with request
    request(`https://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`, function (error, response, body) {
      const json = JSON.parse(body);
      console.log(`----------------------------
    Title: ${json.Title}
    Released: ${json.Released.split(" ")[2]}
    Rotten Tomatoes Rating: ${json.Ratings[1].Value}
    Country Produced: ${json.Country.split(",")[0]}
    Language: ${json.Language.split(",")[0]}
    Plot: ${json.Plot}
    Starring: ${json.Actors}
----------------------------`);
    });
    break;

  // 'do-what-it-says' executes a node liri command based on the contents of random.txt
  case "do-what-it-says":
    var fs = require("fs");
    // npm package 'node-command-line' provides access to node within this file
    var nodeCommandLine = require('node-command-line');

    // utilze fs to read the contents of random.txt
    fs.readFile('random.txt', 'utf8', function (err, data) {
      if (err) {
        console.log(`Error occurred: ${err}`)
      } else {
        nodeCommandLine.run(`node liri.js ${data.split(",")[0]} ${data.split(",")[1]}`);
      };
    });
    break;

  default:
    console.log("I'm sorry...");
} // end switch