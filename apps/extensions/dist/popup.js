(()=>{function e(e){const t=document.getElementsByClassName("content");for(let e=0;e<t.length;e++)t[e].style.display="none";document.getElementById(e).style.display="block"}document.addEventListener("DOMContentLoaded",(()=>{const t=document.getElementById("received-tab"),n=document.getElementById("sent-tab");t.addEventListener("click",(()=>e("received"))),n.addEventListener("click",(()=>e("sent"))),e("received"),async function(){try{const e=await fetch("http://localhost:3000/api/transactions/get");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const t=await e.json();populateTransactions(t.received,"received"),populateTransactions(t.sent,"sent")}catch(e){console.error("Error fetching transactions:",e)}}()}))})();