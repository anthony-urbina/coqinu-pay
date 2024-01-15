const { createWalletClient, createPublicClient, parseEther, custom, http } = require("viem");
const { avalanche } = require("viem/chains");
const { createExternalExtensionProvider } = require("@metamask/providers");
const { WindowPostMessageStream } = require("@metamask/post-message-stream");
const coqAbi = require("./coq-abi.json");
console.log("createMetaMaskProvider:", createExternalExtensionProvider);
const COQ_ADDRESS = "0x420FcA0121DC28039145009570975747295f2329";

const CONTENT_SCRIPT = "fisand-contentscript";
const INPAGE = "fisand-inpage";

const setupPageStream = () => {
  const pageStream = new WindowPostMessageStream({
    name: CONTENT_SCRIPT,
    target: INPAGE,
  });

  pageStream.on("data", (data) => {
    console.log(data + ", world");
    setTimeout(() => {
      pageStream.write("callback");
    }, 1500);
  });
};

// init stream
export default (() => {
  setupPageStream();
})();

// this is where dom manipulation takes place
let link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./content-script.css"; // Adjust the path as necessary
document.head.appendChild(link);

(() => {
  const provider = createExternalExtensionProvider();
  console.log("provider:", provider);
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
      addTipModalToTwitterUI();
      addTipButtonToTwitterUI();
    }
  });

  const addTipButtonToTwitterUI = () => {
    console.log("addTipButtonToTwitterUI");
    const tipBtn = createTipBtn();
    const btnContainer = locateTipBtnContainer();
    btnContainer.prepend(tipBtn);
  };

  const createTipBtn = () => {
    const tipBtn = document.createElement("button");
    tipBtn.className = "coqinu-tip-btn";
    tipBtn.innerText = "Tip Me";
    tipBtn.addEventListener("click", openTipModal);

    return tipBtn;
  };

  const openTipModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("open");
  };

  const addTipModalToTwitterUI = () => {
    const body = document.querySelector("body");
    const modal = createTipModal();
    console.log("modal:", modal);
    body.appendChild(modal);
  };

  const createTipModal = () => {
    const tipModal = document.createElement("div");
    tipModal.className = "modal";

    const form = createForm();
    tipModal.appendChild(form);
    return tipModal;
  };

  const createForm = () => {
    const tipInput = createTipInput();
    const form = document.createElement("form");
    form.className = "tip-form";
    form.appendChild(tipInput);
    form.addEventListener("submit", handleTipSubmit);

    return form;
  };

  const createTipInput = () => {
    const tipInput = document.createElement("input");
    tipInput.className = "tip-input";
    tipInput.placeholder = "Enter amount to tip";

    return tipInput;
  };

  const handleTipSubmit = async (e) => {
    e.preventDefault();
    // send message to background.js
    const tipAmount = e.target[0].value;
    await sendTip(currentUser.walletAddress, tipAmount);
  };

  const locateTipBtnContainer = () => {
    const userActionsBtn = document.querySelector("[data-testid='userActions']");
    const btnContainer = userActionsBtn.parentNode;

    return btnContainer;
  };

  const sendTip = async (walletAddress, tipAmount) => {
    console.log("calling sendTip:", walletAddress, tipAmount);
    const clientConfig = {
      chain: avalanche,
      transport: custom({
        async request({ method, params }) {
          console.log("method:", method);
          console.log("params:", params);
          try {
            const response = await provider.request({ method, params });
            return response;
          } catch (error) {
            console.error("Error in request:", error);
            throw error;
          }
        },
      }),
    };

    const client = createWalletClient(clientConfig);
    console.log("client:", client);

    const accounts = await client.requestAddresses();
    console.log("accounts:", accounts);

    const publicClient = createPublicClient({
      chain: avalanche,
      transport: http(),
    });
    console.log("publicClient:", publicClient);
    const approveHash = await approveToken(publicClient, client, accounts[0], tipAmount);
    const transaction = await publicClient.waitForTransactionReceipt({ hash: approveHash });
    console.log("transaction:", transaction);
    if (!transaction) {
      console.log("no transaction");
      return;
    }
    const transferHash = await transferToken(publicClient, client, accounts[0], walletAddress, tipAmount);
    const transferTransaction = await publicClient.waitForTransactionReceipt({ hash: transferHash });
    console.log("transferTransaction:", transferTransaction);
    const payload = {
      from: accounts[0],
      to: walletAddress,
      amount: tipAmount,
      hash: transferHash,
      type: "TX_SUCCESS",
    };

    chrome.runtime.sendMessage(undefined, payload);
  };
})();

async function approveToken(publicClient, client, account, amount) {
  try {
    const { request: approveRequest, result: approveResult } = await publicClient.simulateContract({
      address: COQ_ADDRESS,
      abi: coqAbi,
      functionName: "approve",
      args: [account, parseEther(amount)],
      account: account,
    });
    console.log("approveResult:", approveResult);

    // You might still want to send the transaction to the blockchain
    const approveHash = await client.writeContract(approveRequest);
    console.log("approveHash:", approveHash);

    // Return the result of the simulation
    return approveHash;
  } catch (error) {
    console.error("Error in approveToken function:", error);
    throw error;
  }
}

async function transferToken(publicClient, client, fromAccount, toAccount, amount) {
  try {
    const { request, result } = await publicClient.simulateContract({
      address: COQ_ADDRESS,
      abi: coqAbi,
      functionName: "transferFrom",
      args: [fromAccount, toAccount, parseEther(amount)],
      account: fromAccount,
    });
    console.log("result:", result);

    // Sending the transaction to the blockchain
    const hash = await client.writeContract(request);
    console.log("Transaction hash:", hash);

    // Return the result of the simulation
    return hash;
  } catch (error) {
    console.error("Error in transferToken function:", error);
    throw error;
  }
}
