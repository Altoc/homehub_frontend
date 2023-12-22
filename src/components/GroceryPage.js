// components/GroceryPage.js
import React from 'react';

const GroceryPage = ({ backendData }) => {
  return (
    <div>
      <h2>Grocery List</h2>
      {/* Your Grocery Page content here */}
      {backendData && <p>Data from backend: {backendData}</p>}
    </div>
  );
};

export default GroceryPage;
