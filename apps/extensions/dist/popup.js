/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
function showTab(tabName) {
  const contents = document.getElementsByClassName("content");
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }

  document.getElementById(tabName).style.display = "block";
}

// Fetch transactions from the API and populate the UI
async function fetchAndDisplayTransactions() {
  try {
    const response = await fetch(`https://coqinu-pay-web.vercel.app/api/transactions/get`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    populateTransactions(data.received, "received");
    populateTransactions(data.sent, "sent");
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

// Populate transactions in

function createTransactionElement(tx) {
  const div = document.createElement("div");
  div.className = "transaction-item";

  const text = document.createTextNode(`${tx.direction}: ${tx.value} `);
  div.appendChild(text);

  const link = document.createElement("a");
  link.href = tx.link;
  link.className = "transaction-link";
  link.textContent = "View in Explorer";
  div.appendChild(link);

  return div;
}

document.addEventListener("DOMContentLoaded", () => {
  const receivedTab = document.getElementById("received-tab");
  const sentTab = document.getElementById("sent-tab");

  receivedTab.addEventListener("click", () => showTab("received"));
  sentTab.addEventListener("click", () => showTab("sent"));

  showTab("received");
  fetchAndDisplayTransactions();
});

/******/ })()
;
//# sourceMappingURL=popup.js.map