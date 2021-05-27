import axios from "axios";

import stopwords from "../common/stopwords";
import type { ITweet, ITweetMetaData } from "../common/interfaces";
import type { RetweetOption } from "../common/types";

// gets the url for the backend, should end up looking like `/api/tweets/${hashtag}[?retweet=opt]`
const getTwitterApi = (hashtag: string, retweets: RetweetOption) => {
  let url = "/api/tweets/";

  url += hashtag;
  if (retweets) url += "?retweets=" + retweets;

  return url;
};

const isOnlyLetters = (s: string) => {
  return /^[a-zA-Z]*$/.test(s);
};

// function to grab the tweets based on the selected hashtag.
// has additional optional parameter to filter retweets out or in.
export const getTweets = (
  hashtag: string,
  retweets: RetweetOption = "do-nothing"
): Promise<ITweet[]> => {
  return axios
    .get(getTwitterApi(hashtag, retweets))
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });
};

// getMetaData processes the tweets and does a few things
// 1. creates a hash of all the words and which tweets the word was said in
//    subnote: it does some word processing that filters out non-characters, links, stopwords, and small words.
// 2. filters out low-scoring words (using the average in this case)
// 3. sorts and weighs the rest of the words based on the frequency.
// returns all the tweets in an array with the word and the ids that match it.
export const getMetaData = (tweets: ITweet[]) => {
  const metaData: Record<string, ITweetMetaData> = {};

  let totalWords = 0;

  tweets.forEach((tweet) => {
    const wordsInTweet = tweet.text
      .replace(/(\n|\r)/gm, " ")
      .match(/\b(\w+)\b/g);
    if (!wordsInTweet) return;
    wordsInTweet.forEach((word) => {
      word = word.toLowerCase();
      if (word.includes("http")) return;
      if (stopwords.includes(word)) return;
      if (word.length < 3) return;
      if (!isOnlyLetters(word)) return;

      totalWords++;
      let metadata = metaData[word];
      if (!metadata) {
        metaData[word] = { ids: [tweet.id], count: 1, word, weight: 0 };
      } else {
        metaData[word].count++;
        // if the word is included multiples times in the same tweet,
        // we don't want to include the id twice in our collection
        if (!metaData[word].ids.includes(tweet.id)) {
          metaData[word].ids.push(tweet.id);
        }
      }
    });
  });

  const uniqueWords = Object.keys(metaData);
  const mean = totalWords / uniqueWords.length;

  let significantWordsCount = 0;

  const significantWords = uniqueWords
    .map((word) => {
      if (metaData[word].count > mean) {
        significantWordsCount += metaData[word].count;
      } else {
        metaData[word].count = 0;
      }
      return metaData[word];
    })
    .filter((x) => x.count > 0);

  significantWords.sort((a, b) => (a.count > b.count ? -1 : 1));
  significantWords.forEach((md) => {
    md.weight = (md.count / significantWordsCount) * 100;
  });

  return significantWords;
};
