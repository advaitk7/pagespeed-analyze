const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const { parseLighthouseAPI } = require('./helpers');

app.get("/", (req, res)=>{
  res.send("Hello There.");
});

app.get("/lighthouse-api", async (req, res) => {
  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const parameters = {
    url: encodeURIComponent(req.query.url),
    key: "AIzaSyDdmwN5ysfD_GGEpeqyKbj8GmBwUEeNMfE",
    // strategy: "mobile"
  };

  let query = `${api}?`;
  
  Object.keys(parameters).forEach((key,index) => {
    query += `${index != 0 ? "&":""}${key}=${parameters[key]}`;
  })
  
  let queryDesktop = query+"&strategy=desktop";
  let queryMobile = query+"&strategy=mobile";
  let response = {};

  await Promise.all([queryDesktop, queryMobile].map((url,i) => new Promise((resolve, reject) => {
    axios.get(url)
      .then(result => {
        if (i == 0) {
          response.desktop = parseLighthouseAPI(result.data);
        } else {
          response.mobile = parseLighthouseAPI(result.data);
        }

        resolve();
      })
      .catch(er => {
        console.log(er);
        reject();
      });  
  })))
    .catch(er => {
      console.log(er);
      res.send("Error!!");
    });

  res.send(response);
})

app.listen(port, ()=>{
  console.log(`Listening on http://localhost:${port}`);
});