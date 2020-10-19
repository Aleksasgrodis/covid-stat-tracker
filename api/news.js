const googleNewsAPI = require('google-news-json');

module.exports = async (req, res) => {
  console.log('news triggered')
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
}