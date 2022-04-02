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

    const response = () => {
      // get all text from within the h1 tags
      const headers = Array.from(document.getElementsByTagName("h1")).map(
        (h1) => h1.innerText
      );

      // get all text from within the paragraph tags
      const paragraphs = Array.from(document.getElementsByTagName("p")).map(
        (p) => p.textContent
      ) as string[];

      const text = [] as string[];
      text.concat(headers);
      text.concat(paragraphs);
      return text;
    };

    sendResponse(response());
  }
);

export {};
