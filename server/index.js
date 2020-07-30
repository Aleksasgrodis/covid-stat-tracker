require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const googleNewsAPI = require('google-news-json');
const app = express()
const port = 3001;

app.use(bodyParser.json());
app.use(cors());


app.get('/api/total', (req, res) => {
  fetch(`https://${process.env.API_HOST}/totals?format=json`, {
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  })
    .then(response => response.text())
    .then(data => res.json(JSON.parse(data)))
    .catch(err => console.log(err));
})

app.get('/api/countries', (req, res) => {
  fetch(`https://${process.env.API_HOST}/help/countries?format=json`, {
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  })
    .then(response => response.text())
    .then(data => res.json(JSON.parse(data)))
    .catch(err => console.log(err));
})

app.get('/api/countries/:name', (req, res) => {
  fetch(`https://${process.env.API_HOST}/country?format=json&name=${req.params.name}`, {
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  })
    .then(response => response.text())
    .then(data => res.json(JSON.parse(data)))
    .catch(err => console.log(err));
})

// app.get('/api/news', (req, res) => {
//   fetch(`http://newsapi.org/v2/top-headlines?q=Covid&from=2020-07-30&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`)
//     .then(response => response.json())
//     .then(data => res.json(data));
// })

app.get('/api/news', async (req, res) => {
  try {
    const { items } = await googleNewsAPI.getNews(googleNewsAPI.TOP_NEWS, "covid", "en-GB")
  // const items = await items.filter((a, i) => i < 15);
  res.json({
    articles: items
  })
  } catch(err) {
    console.log(err);
    res.end();
  }
  
  // fetch(`http://newsapi.org/v2/top-headlines?q=Covid&from=2020-07-30&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`)
  //   .then(response => response.json())
  //   .then(data => res.json(data));
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))