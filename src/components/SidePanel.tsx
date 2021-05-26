import React, { useState, useEffect } from "react";
import "../styles/header.css";
import Tweet from "./Tweet";

interface SidePanelProps {
  showTweets: number;
}

function SidePanel({ showTweets }: SidePanelProps) {
  return (
    <aside className="sidepanel">
      {new Array(showTweets).fill(1).map((x) => (
        <Tweet
          text="hello"
          id="1397622849125289985"
          created_at="2021-05-26T18:37:08.000Z"
        />
      ))}
    </aside>
  );
}

export default SidePanel;
