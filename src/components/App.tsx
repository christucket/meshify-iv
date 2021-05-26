import { setUncaughtExceptionCaptureCallback } from "process";
import React, {useState} from "react";
import "../styles/app.css";
import Header from "./Header"
import SidePanel from "./SidePanel"

function App() {
  const [hashtag, setHashtag] = useState("IoT");
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <button onClick={() => {setCount(c => c+1)}}>add tweet</button>
      <Header hashtag={hashtag} setHashtag={setHashtag} />
      <SidePanel showTweets={count}/>
      <div>hashtag is: {hashtag}</div>
      
    </div>
  );
}

export default App;
