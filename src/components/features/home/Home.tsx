import React from 'react';
import NewsFeed from '../newsFeed/NewsFeed';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <h1 className="home-title">News Aggregator</h1>
      <NewsFeed />
    </div>
  );
};

export default Home;