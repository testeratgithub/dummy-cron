const axios = require('axios');
const  http = require('http');


function getISTTimeString(date = new Date()) {
    // Convert to IST offset (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 19800000 ms
    const istDate = new Date(date.getTime() + istOffset);
  
    return istDate.toDateString() + ' ' + istDate.toTimeString();
  }

  
let last_refresh;

async function callAPIs() {
  try {
    console.log("Flushing cache...");
    await axios.get('https://portal.proconnectlogistics.com/AI/api/data/cache/flush');

    console.log("Waiting 2 seconds...");
    await new Promise(res => setTimeout(res, 2000));

    console.log("Refreshing cache...");
    await axios.get('https://portal.proconnectlogistics.com/AI/api/data/cache/');

    last_refresh = getISTTimeString();
    console.log("Completed.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

setInterval(callAPIs, 2 * 60 * 1000); // Every 2 minutes
callAPIs(); // Run immediately on start


//create a server object:
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (last_refresh) {
    res.end(`Last refresh: ${last_refresh}`);
  } else {
    res.end("API call has not run yet.");
  }
}).listen(8080); //the server object listens on port 8080