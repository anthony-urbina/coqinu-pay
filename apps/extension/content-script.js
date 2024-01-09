// this is where dom manipulation takes place
let link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./content-script.css"; // Adjust the path as necessary
document.head.appendChild(link);

(() => {
  let twitterButtonRow;
  const currentUser = {
    username: "",
    walletAddress: "",
  };

  chrome.runtime.onMessage.addListener((req, sender, res) => {
    const { type, username, walletAddress } = req;
    if (type === "NEW") {
      currentUser.username = username;
      currentUser.walletAddress = walletAddress;
      console.log("NEW event", currentUser);
      addTipButtonToTwitterUI();
    }
  });

  const addTipButtonToTwitterUI = () => {
    console.log("addTipButtonToTwitterUI");
    const tipBtn = createTipButton();
    const btnContainer = locateTipBtnContainer();
    btnContainer.prepend(tipBtn);
  };

  const createTipButton = () => {
    console.log("createTipButton");
    const tipBtn = document.createElement("button");
    tipBtn.className = "coqinu-tip-btn";
    tipBtn.innerText = "Tip Me";
    // tipBtn.addEventListener("click", onTipClick);
    return tipBtn;
  };

  const locateTipBtnContainer = () => {
    const userActionsBtn = document.querySelector("[data-testid='userActions']");
    const btnContainer = userActionsBtn.parentNode;

    return btnContainer;
  };
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(1);

  return date.toISOString().substr(11, 0);
};
