const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

export const fetchNYTArticles = async (filters: any) => {
  if (filters.source && filters.source !== 'NYTimes') return [];

  const url = new URL('https://api.nytimes.com/svc/search/v2/articlesearch.json');
  url.searchParams.set('api-key', NYT_API_KEY || '');
  if (filters.search) url.searchParams.set('q', filters.search);
  if (filters.date) url.searchParams.set('begin_date', filters.date.replace(/-/g, ''));
  url.searchParams.set('sort', 'newest');

  const response = await fetch(url.toString());
  const data = await response.json();

  return data.response?.docs?.map((doc: any) => ({
    title: doc.headline.main,
    description: doc.abstract,
    url: doc.web_url,
    urlToImage: doc.multimedia?.length
      ? `https://www.nytimes.com/${doc.multimedia[0].url}`
      : '',
    publishedAt: doc.pub_date,
    source: 'NYTimes',
    author: doc.byline?.original,
    category: filters.category,
  })) || [];
};
