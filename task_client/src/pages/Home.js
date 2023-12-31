import React from 'react';
import Navbar from "../components/Navbar";

const Home = ({ setAuth }) => {


  return (
    <div className="home-page">
      <Navbar setAuth={setAuth} />
      
      <div className="content">

      </div>
    </div>
  );
};

export default Home;
