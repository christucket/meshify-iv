import React, { useState, useEffect } from "react";
import "../styles/header.css";

interface HeaderProps {
  hashtag: string;
  setHashtag: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ hashtag, setHashtag }: HeaderProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(event.target.value);
  };

  return (
    <header className="header">
      <div className="header__title">Hashtag Word Cloud</div>
      <div>
        <span>Choose hashtag:</span>
        <input
          className="header__hashtag"
          value={hashtag}
          onChange={handleOnChange}
        />
      </div>
    </header>
  );
}

export default Header;
