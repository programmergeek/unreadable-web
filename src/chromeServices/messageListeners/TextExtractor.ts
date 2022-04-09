/**
 * Listen for a message from the extension.
 * When message from extension is received, extract all text data from current tab and send that as a response.
 */

chrome.runtime.onMessage.addListener(
  // Register a message listener to listen for a message containing the text 'SCRAMBLE_TEXT'
  function (
    request: "SCRAMBLE_TEXT",
    sender,
    sendResponse: (response: string[]) => void
  ) {
    console.log("[content.js]. Message received", request);

    sendResponse(getText());
  }
);

const getText = () => {
  const text = [] as string[]; // array to hold all the text on the page
  const headerTypes = ["h1", "h2", "h3", "h4", "h5", "h6"]; // array of header tag names

  // get text from all header elements
  for (const header of headerTypes) {
    Array.from(
      document.getElementsByTagName(
        header
      ) as HTMLCollectionOf<HTMLHeadingElement> // specify that we are looking for header elements
    ).map((e) => {
      text.push(e.innerText); // add header text to the array
    });
  }

  Array.from(document.getElementsByTagName("p")).map((e) => {
    text.push(e.textContent as string);
  }); // get text from p elements and add it to the text array
  return text;
};

export {};
