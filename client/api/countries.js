import fetch from 'node-fetch';

module.exports = (req, res) => {
  console.log('countries invoked');

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
}