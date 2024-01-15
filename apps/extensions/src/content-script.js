const { createWalletClient, createPublicClient, parseEther, custom, http } = require("viem");
const { avalanche } = require("viem/chains");
// const { createExternalExtensionProvider } = require("@metamask/providers");
// const { WindowPostMessageStream } = require("@metamask/post-message-stream");
// const coqAbi = require("./coq-abi.json");
// console.log("createMetaMaskProvider:", createExternalExtensionProvider);
// const COQ_ADDRESS = "0x420FcA0121DC28039145009570975747295f2329";
// const provider = createExternalExtensionProvider();
// console.log("provider:", provider);
// const CONTENT_SCRIPT = "fisand-contentscript";
// const INPAGE = "fisand-inpage";

// const setupPageStream = () => {
//   const pageStream = new WindowPostMessageStream({
//     name: CONTENT_SCRIPT,
//     target: INPAGE,
//   });

//   pageStream.on("data", (data) => {
//     console.log(data + ", world");
//     setTimeout(() => {
//       pageStream.write("callback");
//     }, 1500);
//   });
// };

// // init stream
// export default (() => {
//   setupPageStream();
// })();

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
      addTipModalToTwitterUI();

      const tipBtn = document.querySelector(".coqinu-tip-btn");
      if (!tipBtn) {
        addTipButtonToTwitterUI();
      }
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

    const closeBtn = createCloseBtn();
    tipModal.appendChild(closeBtn);

    const coqLogo = createCoqLogo();
    tipModal.appendChild(coqLogo);

    const form = createForm();
    tipModal.appendChild(form);
    return tipModal;
  };

  const createCoqLogo = () => {
    const container = document.createElement("div");
    container.className = "coqinu-logo-container";

    const coqLogo = document.createElement("img");
    coqLogo.className = "coqinu-logo";
    const logoUrl = chrome.runtime.getURL("assets/img/coqinu-logo.png");
    coqLogo.src = logoUrl;

    container.appendChild(coqLogo);

    return container;
  };

  const createForm = () => {
    const form = document.createElement("form");
    form.className = "tip-form";

    const tipInput = createTipInput();
    form.appendChild(tipInput);

    const sendTipBtn = createSendTipBtn();
    form.appendChild(sendTipBtn);

    form.addEventListener("submit", handleTipSubmit);

    return form;
  };

  const createTipInput = () => {
    const tipInput = document.createElement("input");
    tipInput.className = "tip-input";
    tipInput.placeholder = "Enter amount to tip in $COQ";

    return tipInput;
  };

  const createSendTipBtn = () => {
    const sendTipBtn = document.createElement("button");
    sendTipBtn.className = "send-tip-btn";
    sendTipBtn.innerText = "Send Tip";

    return sendTipBtn;
  };

  const createCloseBtn = () => {
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", "16");
    svg.setAttribute("width", "12");
    svg.setAttribute("viewBox", "0 0 384 512");

    // Create path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
    );

    // Append path to SVG
    svg.appendChild(path);
    svg.style.fill = "#757575";

    // Append SVG to button
    closeBtn.appendChild(svg);

    closeBtn.addEventListener("click", () => {
      const tipInput = document.querySelector(".tip-input");
      tipInput.value = "";
      const tipBtn = document.querySelector(".send-tip-btn");
      tipBtn.innerText = "Send Tip";

      const modal = document.querySelector(".modal");
      modal.classList.remove("open");
    });

    return closeBtn;
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

    const tipBtn = document.querySelector(".send-tip-btn");
    tipBtn.innerText = "Approving...";

    const transaction = await publicClient.waitForTransactionReceipt({ hash: approveHash });
    tipBtn.innerText = "Send Tip";
    console.log("transaction:", transaction);

    if (transaction.status === "reverted") {
      console.log("transaction reverted");
      return;
    }

    const transferHash = await transferToken(publicClient, client, accounts[0], walletAddress, tipAmount);
    tipBtn.innerText = "Sending Tip...";
    const transferTransaction = await publicClient.waitForTransactionReceipt({ hash: transferHash });
    console.log("transferTransaction:", transferTransaction);

    if (transferTransaction.status === "success") {
      tipBtn.innerText = "Success";
      displaySuccessMessage(transferTransaction.transactionHash);
      const payload = {
        from: accounts[0],
        to: walletAddress,
        amount: tipAmount,
        hash: transferHash,
        type: "TX_SUCCESS",
      };
      chrome.runtime.sendMessage(undefined, payload);
    }
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

function displaySuccessMessage(hash) {
  const modal = document.querySelector(".modal");
  const form = document.querySelector(".tip-form");
  form.remove();

  const successMessage = document.createElement("p");
  successMessage.className = "success-message";
  successMessage.innerText = "Tip sent successfully! 🎉🐓";

  const snowtraceLink = document.createElement("a");
  snowtraceLink.className = "snowtrace-link";
  snowtraceLink.innerText = "Click to view on Snowtrace";
  snowtraceLink.href = `https://snowtrace.io/tx/${hash}`;
  snowtraceLink.target = "_blank";

  modal.appendChild(successMessage);
  modal.appendChild(snowtraceLink);
}
