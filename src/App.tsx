import React from "react";
import "./App.css";

const handleClick = () => {
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
          (response: string[]) => console.log(response)
        );
      }
    );
};

function App() {
  return (
    <div className="App">
      <button onClick={() => handleClick()}>Make Me Illiterate</button>
    </div>
  );
}

export default App;
