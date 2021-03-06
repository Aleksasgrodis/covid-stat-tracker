require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const googleNewsAPI = require('google-news-json');
const app = express();
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
    .catch(err => {
      console.log(err);
      res.end();
    });
});

app.get('/api/countries', (req, res) => {
  fetch(`https://${process.env.API_HOST}/help/countries?format=json`, {
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  })
    .then(response => response.text())
    .then(data => res.json(JSON.parse(data)))
    .catch(err => {
      console.log(err);
      res.end();
    });
});

app.get('/api/countries/:name', (req, res) => {
  fetch(
    `https://${process.env.API_HOST}/country?format=json&name=${req.params.name}`,
    {
      headers: {
        'x-rapidapi-host': process.env.API_HOST,
        'x-rapidapi-key': process.env.API_KEY,
      },
    },
  )
    .then(response => response.text())
    .then(data => res.json(JSON.parse(data)))
    .catch(err => {
      console.log(err);
      res.end();
    });
});

app.get('/api/news', async (req, res) => {
  try {
    const { items } = await googleNewsAPI.getNews(
      googleNewsAPI.TOP_NEWS,
      'covid',
      'en-GB',
    );
    res.json({
      articles: items.map(a => {
        const [ title, publisher ] = a.title.split(' - ');
        return {
          title,
          publisher,
          url: a.url,
          created: a.created,
        }
      })
    });
  } catch (err) {
    console.log(err);
    res.end();
  }
});

app.get('/api/diff/:country', (req, res) => {
  const { country } = req.params;
  fetch(`https://covid19-api.org/api/diff/${country}`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.end();
    });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
