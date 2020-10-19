import fetch from 'node-fetch';

module.exports = (req, res) => {
  console.log('country stats invoked');

  const {
    query: { country },
  } = req;
  console.log(country);
  fetch(
    `https://${process.env.API_HOST}/country?format=json&name=${country}`,
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
};
