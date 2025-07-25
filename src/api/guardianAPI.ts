const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

export const fetchGuardianArticles = async (filters: any) => {
  if (filters.source && filters.source !== 'Guardian') return [];

  const url = new URL('https://content.guardianapis.com/search');
  url.searchParams.set('api-key', GUARDIAN_API_KEY || '');
  if (filters.search) url.searchParams.set('q', filters.search);
  if (filters.date) url.searchParams.set('from-date', filters.date);
  url.searchParams.set('show-fields', 'thumbnail,trailText,byline');
  url.searchParams.set('page-size', '10');

  const response = await fetch(url.toString());
  const data = await response.json();

  return data.response?.results?.map((item: any) => ({
    title: item.webTitle,
    description: item.fields?.trailText,
    url: item.webUrl,
    urlToImage: item.fields?.thumbnail,
    publishedAt: item.webPublicationDate,
    source: 'Guardian',
    author: item.fields?.byline,
    category: filters.category,
  })) || [];
};
