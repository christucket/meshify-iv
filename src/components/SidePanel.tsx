import React, { useState, useEffect } from "react";
import TweetEmbed from "react-tweet-embed";

import "../styles/sidepanel.css";

interface ISidePanelProps {
  showTweets: string[];
}

function SidePanel({ showTweets }: ISidePanelProps) {
  const [showing, setShowing] = useState(5);
  const showTweetsIds = showTweets.join("");

  // anytime the tweets change, we want to dial it back down to only showing 5
  useEffect(() => {
    setShowing(5);
  }, [showTweetsIds]);

  return (
    <aside className="sidepanel">
      {showTweets.slice(0, showing).map((id) => (
        <TweetEmbed id={id} key={id} />
      ))}
      {showTweets.length > showing && (
        <button
          onClick={() => {
            setShowing((showing) => showing + 5);
          }}
        >
          Show more
        </button>
      )}
    </aside>
  );
}

export default SidePanel;
