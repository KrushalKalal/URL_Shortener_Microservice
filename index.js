require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const existanceUrl = [];
const shortUrl = [];
app.post("/api/shorturl",(req,res)=>{
  const url = req.body.url;
  const index = existanceUrl.indexOf(url);

  if(!url.includes("https://") && !url.includes("http://")){
     res.json({
      error: "invalid url"
     })
  }

  if(index < 0){
    existanceUrl.push(url);
    shortUrl.push(shortUrl.length)

    return res.json({
      original_url: url,
      short_url: shortUrl.length - 1
    })
  }
  return res.json({
    original_url: url,
    short_url: shortUrl[index]
  })
})

app.get("/api/shorturl/:short_url",(req,res)=>{
  const url = parseInt(req.params.short_url);
  const index = shortUrl.indexOf(url);
   if(index < 0){
    res.json({
      error: "No short URL found for the given input"
    })
   }
  res.redirect(existanceUrl[index])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
