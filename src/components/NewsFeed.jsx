import React from 'react';
import moment from 'moment';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/core';
import './NewsFeed.scss';

const override = css`
  display: block;
  margin: 50px auto;
  border-color: red;
  width: 90px;
`;

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
                <div className="details">
                  <span className="publisher">
                    -
                    { article.publisher}
                  </span>
                  <span className="date">{moment(article.created).format('DD/MM/YYYY')}</span>
                </div>
              </article>
            </a>
          ))
          : <PulseLoader css={override} color="white" size={25} />}
      </section>
    );
  }
}
