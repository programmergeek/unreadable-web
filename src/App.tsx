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
          (response: string[]) => setText(response) // store response from content script in text state
        );
      }
    );
};

/**
 * returns a scrambled version of the input string
 * @param text  string
 * @returns string
 */
const scramble = (text: string) => {
  let scrambledText = "";
  for (let i = 0; i < text.length; i++) {
    const shift = Math.floor(Math.random() * 5); // generate a random number between 0 and 5
    if (text[i] !== " ") {
      scrambledText += String.fromCharCode(text.charCodeAt(i) + shift); // increase the character code of each letter by a value between 0 and 5
    }
  }
  return scrambledText;
};

/**
 * @param text string[]
 * @returns string[]
 */
const scrambleText = (text: string[]) => {
  for (let i = 0; i < text.length; i++) {
    text[i] = scramble(text[i]);
  }
  return text;
};

function App() {
  const [text, setText] = useState<string[]>([]); // state to store the text from content script
  return (
    <div className="App">
      <button onClick={() => handleClick(setText)}>Make Me Illiterate</button>
    </div>
  );
}

export default App;
