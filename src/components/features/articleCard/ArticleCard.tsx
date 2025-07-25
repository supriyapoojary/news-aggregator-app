import React from 'react';
import './ArticleCard.css';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: string | { id?: string; name: string };
  author?: string;
}

interface Props {
  article: Article;
}

const ArticleCard: React.FC<Props> = ({ article }) => {
  const sourceName = typeof article.source === 'object' ? article.source.name : article.source;

  return (
    <div className="article-card">
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="article-image" />}
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-description">{article.description}</p>
        <p className="article-meta">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          {article.author && <span> | {article.author}</span>}
          {sourceName && <span> | {sourceName}</span>}
        </p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read more
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
