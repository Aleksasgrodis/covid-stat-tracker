require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express()
const port = 3001;

app.use(bodyParser.json());
app.use(cors());


app.get('/api/total', (req, res) => {
  console.log()
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
  console.log()
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
  console.log(req.params.name)
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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))