import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import API from '../../axios';

const Home = () => {
  const [category, setCategory] = useState('All');
  const [foods, setFoods] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get('/api/food');
        setFoods(res.data);
      } catch (err) {
        console.error('Error fetching foods:', err);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="home-page">
      <Header />

      <div id="explore-menu">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} foods={foods} />
      </div>

      <div id="mobile-app">
        <AppDownload />
      </div>
    </div>
  );
};

export default Home;
