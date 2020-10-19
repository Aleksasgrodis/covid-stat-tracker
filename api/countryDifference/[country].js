import fetch from 'node-fetch';

module.exports = (req, res) => {
  console.log('country diff invoked');

  const {
    query: { country },
  } = req;
  console.log(country);
  fetch(`https://covid19-api.org/api/diff/${country}`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.end();
    });
};
