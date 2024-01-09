const ignorePathnames = ["notifications", "explore", "home", "messages"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && shouldProcessTab(tab)) {
    handleTabUpdate(tabId, tab.url);
  }
});

async function handleTabUpdate(tabId, url) {
  const username = extractUsernameFromPath(url);
  if (username) {
    const user = await fetchUserFromDirectory(username);
    console.log("user:", user);
    const { twitterUsername, walletAddress } = user;

    const userIsInDirectory = twitterUsername && walletAddress;
    if (userIsInDirectory) {
      console.log("sending message to content script");
      const payload = {
        type: "NEW",
        username: twitterUsername,
        walletAddress,
      };
      chrome.tabs.sendMessage(tabId, payload);
    }
  }
}

function shouldProcessTab(tab) {
  const isTwitterTab = tab.url.includes("twitter.com");
  const isXTab = tab.url.includes("x.com");
  return tab.url && (isTwitterTab || isXTab) && !isPathIgnored(tab.url);
}

function isPathIgnored(url) {
  const ignorePathnames = ["notifications", "explore", "home", "messages"];
  const firstPathPart = new URL(url).pathname.split("/")[1];
  return ignorePathnames.includes(firstPathPart);
}

function extractUsernameFromPath(url) {
  const pathname = new URL(url).pathname;
  const pathParts = pathname.split("/").filter((part) => part);
  return pathParts.length > 0 ? pathParts[0] : null;
}

const fetchUserFromDirectory = async (username) => {
  try {
    const url = `http://localhost:3000/api/user/get/${username}`;
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
