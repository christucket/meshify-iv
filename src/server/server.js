const express = require("express");
const axios = require("axios");
require("dotenv").config();

// creates an axios object specifically for twitters auth
// if we had multiple sources we'd want to put these objects somewhere else to be authed
// and then just use the object
const twitterAxios = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  },
});

const PORT = 3001;

const app = express();

const getTwitterApi = (hashtag, retweets) => {
  let url = "https://api.twitter.com/2/tweets/search/recent?";

  url += `query=%23${hashtag}`;
  if (retweets === "no-retweets") url += "%20-is:retweet";
  if (retweets === "only-retweets") url += "%20is:retweet";
  url += "&max_results=100";

  return url;
};

// just a simple proxy between the twitter api and the front end
app.get("/api/tweets/:hashtag", (req, res) => {
  const url = getTwitterApi(req.params.hashtag, req.query.retweets);

  twitterAxios
    .get(url)
    .then((twitterResponse) => {
      res.send(twitterResponse.data);
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        console.log(
          ".env file should have a TWITTER_BEARER_TOKEN property in it with the twitter Bearer token"
        );
      } else {
        console.log("Unknown error", err);
      }

      res.sendStatus(err.statusCode);
    });
});

app.listen(PORT, () => {
  console.log("server started");
});
