import React, { useState } from "react";
import "./App.css";

const handleClick = (
  setText: React.Dispatch<React.SetStateAction<string[]>>
) => {
  chrome.tabs &&
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id || 0,
          "SCRAMBLE_TEXT",
          (response: string[]) => setText(response)
        );
      }
    );
};

function App() {
  const [text, setText] = useState<string[]>([]);
  return (
    <div className="App">
      <button onClick={() => handleClick(setText)}>Make Me Illiterate</button>
    </div>
  );
}

export default App;
