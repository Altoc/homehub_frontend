// components/HomePage.js
import React from 'react';

const HomePage = ({ backendData }) => {
  return (
    <div>
      <h2>Home</h2>
      {/* Your home page content here */
        <p>Testing thi sis on the homepage!!1!</p>
      }
      {backendData && <p>Data from backend: {backendData}</p>}
    </div>
  );
};

export default HomePage;
