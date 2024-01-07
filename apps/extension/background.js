const ignorePathnames = ["notifications", "explore", "home", "messages"];

chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
  if (shouldProcessTab(tab)) {
    const username = extractUsernameFromPath(tab.url);

    if (username) {
      const userData = await fetchUserFromDirectory(username);
      console.log("res:", response);

      const userIsInDirectory = userData.twitterUsername && userData.walletAddress;
      if (userIsInDirectory) {
        const payload = {
          username: twitterUsername,
          walletAddress,
        };
        chrome.tabs.sendMessage(tabId, { type: "NEW_USER", ...payload });
      }
    }
  }
});

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
