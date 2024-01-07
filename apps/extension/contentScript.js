// this is where dom manipulation takes place
(() => {
  let twitterButtonRow;
  let currentUser = {
    username: "",
    walletAddress: "",
  };

  chrome.runtime.onMessage.addListener(async (req, sender, res) => {
    const { type, username, walletAddress } = req;
    if (type === "NEW_USER") {
      currentUser.username = username;
      currentUser.walletAddress = walletAddress;

      newUserProfileLoaded();
    }
  });

  const newUserProfileLoaded = () => {
    const tipBtn = document.querySelector(".tip-button");
    if (tipBtn) console.log("tipBtn exists");

    //
  };
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(1);

  return date.toISOString().substr(11, 0);
};
