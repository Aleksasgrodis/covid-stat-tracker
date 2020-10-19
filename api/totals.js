import fetch from 'node-fetch';

module.exports = (req, res) => {
  console.log('totals invoked');
  fetch(`https://${process.env.API_HOST}/totals?format=json`, {
    headers: {
      'x-rapidapi-host': process.env.API_HOST,
      'x-rapidapi-key': process.env.API_KEY,
    },
  })
    .then(response => {
      console.log(response);
      return response.text();})
    .then(data => {
      console.log('data')
      res.json(JSON.parse(data))})
    .catch(err => {
      console.log(err);
      res.end();
    });
};
