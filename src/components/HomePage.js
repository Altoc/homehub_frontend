// components/HomePage.js
import React from 'react';

const HomePage = ({ backendData }) => {
  return (
    <div>
      <h2>Home Page</h2>
      {/* Your home page content here */}
      {backendData && <p>Data from backend: {backendData}</p>}
    </div>
  );
};

export default HomePage;
