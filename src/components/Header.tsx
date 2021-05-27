import React from "react";
import "../styles/header.css";

import type { RetweetOption } from "../common/types";

interface IHeaderProps {
  hashtag: string;
  setHashtag: React.Dispatch<React.SetStateAction<string>>;
  retweetOption: RetweetOption;
  setRetweetOption: React.Dispatch<React.SetStateAction<RetweetOption>>;
}

function Header({
  hashtag,
  setHashtag,
  retweetOption,
  setRetweetOption,
}: IHeaderProps) {
  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(event.target.value);
  };

  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    if (
      value === "no-retweets" ||
      value === "only-retweets" ||
      value === "do-nothing"
    ) {
      setRetweetOption(value);
    }
  };

  return (
    <header className="header">
      <div className="header__title">Hashtag Word Cloud</div>
      <div>
        <span>Choose hashtag:</span>
        <input
          className="header__hashtag"
          value={hashtag}
          onChange={handleInputOnChange}
        />
      </div>
      <div>
        <span>Retweets:</span>
        <select value={retweetOption} onChange={handleSelectOnChange}>
          <option value="do-nothing">Do nothing</option>
          <option value="no-retweets">Ignore retweets</option>
          <option value="only-retweets">Only retweets</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
