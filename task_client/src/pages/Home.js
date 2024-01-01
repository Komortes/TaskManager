// Home.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import CalendarList from '../components/CalendarList'; 

const Home = ({ setAuth }) => {
  return (
    <div className="home-page">
      <Navbar setAuth={setAuth} />
      <div className="content">
        <CalendarList />
      </div>
    </div>
  );
};

export default Home;
