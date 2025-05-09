const axios = require('axios');

async function callAPIs() {
  try {
    console.log("Flushing cache...");
    await axios.get('https://portal.proconnectlogistics.com/AI/api/data/cache/flush');

    console.log("Waiting 2 seconds...");
    await new Promise(res => setTimeout(res, 2000));

    console.log("Refreshing cache...");
    await axios.get('https://portal.proconnectlogistics.com/AI/api/data/cache/');

    console.log("Completed.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

setInterval(callAPIs, 2 * 60 * 1000); // Every 2 minutes
callAPIs(); // Run immediately on start