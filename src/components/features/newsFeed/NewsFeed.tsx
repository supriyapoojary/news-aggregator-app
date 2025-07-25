import React, { useEffect, useState } from 'react';
import ArticleCard from '../articleCard/ArticleCard';

import SearchFilter from '../searchFilter/SearchFilter';
import './NewsFeed.css';
import { fetchNewsAPIArticles } from '../../../api/newsAPI';
import { fetchGuardianArticles } from '../../../api/guardianAPI';
import { fetchNYTArticles } from '../../../api/nytAPI';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: string | { id?: string; name: string };
  author?: string;
  category?: string;
}

interface FilterValues {
  search: string;
  date: string;
  category: string;
  source: string;
}

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<FilterValues>({
    search: '',
    date: '',
    category: '',
    source: '',
  });

  const allSources = ['NewsAPI', 'Guardian', 'NYTimes'];
  const allCategories = ['World', 'Business', 'Technology', 'Sports', 'Entertainment'];

  const loadArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const [newsapi, guardian, nyt] = await Promise.all([
        fetchNewsAPIArticles(filters),
        fetchGuardianArticles(filters),
        fetchNYTArticles(filters),
      ]);

      const combined = [...newsapi, ...guardian, ...nyt];
      setArticles(combined);
    } catch (err: any) {
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [filters]);

  return (
    <div className="news-feed">
      <SearchFilter
        onFilterChange={setFilters}
        availableCategories={allCategories}
        availableSources={allSources}
      />

      {loading && <p className="loading">Loading articles...</p>}
      {error && <p className="error">{error}</p>}

      <div className="articles-grid">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
