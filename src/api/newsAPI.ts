const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const fetchNewsAPIArticles = async (filters: any) => {
  if (filters.source && filters.source !== 'NewsAPI') return [];

  const url = new URL('https://newsapi.org/v2/everything');
  url.searchParams.set('apiKey', NEWS_API_KEY || '');
  if (filters.search) url.searchParams.set('q', filters.search);
  if (filters.date) url.searchParams.set('from', filters.date);
  url.searchParams.set('language', 'en');
  url.searchParams.set('pageSize', '10');

  const response = await fetch(url.toString());
  const data = await response.json();

  return data.articles?.map((a: any) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    urlToImage: a.urlToImage,
    publishedAt: a.publishedAt,
    source: a.source?.name || 'NewsAPI',
    author: a.author,
    category: filters.category,
  })) || [];
};
