const axios = require('axios');
const  http = require('http');

let last_refresh;

async function callAPIs() {
  try {
    console.log("Flushing cache...");
    await axios.get('https://portal.proconnectlogistics.com/AI/api/data/cache/flush');

    console.log("Waiting 2 seconds...");
    await new Promise(res => setTimeout(res, 2000));

    console.log("Refreshing cache...");
    await axios.get('https://portal.proconnectlogistics.com/AI/api/data/cache/');

    last_refresh = new Date();
    console.log("Completed.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

setInterval(callAPIs, 2 * 60 * 1000); // Every 2 minutes
callAPIs(); // Run immediately on start


//create a server object:
http.createServer(function (req, res) {
    res.write(last_refresh); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080