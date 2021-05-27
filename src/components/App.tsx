import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import type { Word } from "react-wordcloud";

import "../styles/app.css";

import Header from "./Header";
import SidePanel from "./SidePanel";

import { getTweets, getMetaData } from "../lib/util";
import type { ITweetMetaData } from "../common/interfaces";
import type { RetweetOption } from "../common/types";

const MAX_RESULTS = 20;

function App() {
  const [hashtag, setHashtag] = useState("IoT");
  const [selectedTweets, setSelectedTweets] = useState<string[]>([]);
  const [metaData, setMetaData] = useState<ITweetMetaData[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [retweetOption, setRetweetOption] = useState<RetweetOption>(
    "no-retweets"
  );
  const [errorOrMissing, setErrorOrMissing] = useState(false);

  useEffect(() => {
    const cleanedHashtag = hashtag.replace("#", "");
    if (!cleanedHashtag || cleanedHashtag.length < 3) return;

    getTweets(cleanedHashtag, retweetOption)
      .then((_tweets) => {
        if (!_tweets?.length) {
          setErrorOrMissing(true);
          return;
        }
        setErrorOrMissing(false);

        const _metaData = getMetaData(_tweets);
        const _words = _metaData.map((word) => ({
          text: word.word,
          value: word.weight,
        }));

        setMetaData(_metaData);
        setWords(_words.slice(0, MAX_RESULTS));

        const wordData = _metaData.filter(
          (data) => data.word === hashtag.toLowerCase()
        )[0];

        if (wordData) {
          setSelectedTweets(wordData.ids);
        } else {
          setSelectedTweets([]);
        }
      })
      .catch(() => {
        setErrorOrMissing(true);
      });
  }, [hashtag, retweetOption]);

  const wordClickCallback = (word: Word) => {
    const wordData = metaData.filter((data) => data.word === word.text)[0];

    if (wordData) {
      setSelectedTweets(wordData.ids);
    } else {
      setSelectedTweets([]);
    }
  };

  return (
    <div className="app">
      <Header
        hashtag={hashtag}
        setHashtag={setHashtag}
        retweetOption={retweetOption}
        setRetweetOption={setRetweetOption}
      />
      <SidePanel showTweets={selectedTweets} />
      <div className="wordcloud">
        {!errorOrMissing ? (
          <ReactWordcloud
            words={words}
            size={[500, 700]}
            options={{
              rotations: 0,
              fontSizes: [8, 64],
              padding: 1,
              spiral: "rectangular",
            }}
            callbacks={{
              onWordClick: wordClickCallback,
            }}
          />
        ) : (
          <div className="wordcloud__error">
            The hashtag you selected has no data or an error occured
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
