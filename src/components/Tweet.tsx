import React from "react";
import "../styles/header.css";

interface TweetProps {
  id: string;
  text: string;
  created_at: string;
}

// this is html taken from the twitter publish site
// https://publish.twitter.com/
// i modified it a bit and hopefully i'm not breaking any twitter guidelines or something

// future: data-theme="dark" is an option in the blockquote

// i think twitter is using most of this data for prerendering only. it seems like
// ```id``` is the critical part here that they parse out and show everything with.

// can't get the twitter api to return the username and name fields back from the tweet,
// so just going to make those empty until i figure it out. it might have to do with me
// having a brand new twitter account

function Tweet(props: TweetProps) {
  const name = "US Department of the Interior";
  const username = "Interior";

  return (
    <blockquote className="twitter-tweet" data-theme="dark">
      <p lang="en" dir="ltr">
        {props.text}
      </p>
      &mdash; {name} (@{username}){" "}
      <a
        href={`https://twitter.com/${username}/status/${props.id}?ref_src=twsrc%5Etfw`}
      >
        {new Date(props.created_at).toDateString()}
      </a>
    </blockquote>
  );
}

export default Tweet;
