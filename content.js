chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "overrideWinner") {
    const scriptUrl = chrome.runtime.getURL("override.js");

    localStorage.setItem("tms-winner", request.winner);

    const script = document.createElement("script");

    script.src = scriptUrl;

    document.head.appendChild(script);

    sendResponse({ status: "Done!!!" });
  }
});
