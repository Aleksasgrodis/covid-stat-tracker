import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './NewsFeed.scss';

export default class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
    };
  }

  componentDidMount() {
    fetch('/api/news')
      .then(response => response.json())
      .then(object => object.articles.filter((a, i) => i < 15))
      .then(data => this.setState({ articles: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { articles } = this.state;
    return (
      <section className="news-feed">
        <h2>Latest News</h2>
        {articles
          ? articles.map(article => (
            <a href={article.url}>
              <article className="article">
                <h5>{article.title}</h5>
                {/* <p>{article.description}</p> */}
                <p>{moment(article.created).format('DD/MM/YYYY')}</p>
              </article>
            </a>
          ))
          : null}
      </section>
    );
  }
}
