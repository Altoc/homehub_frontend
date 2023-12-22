// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';

// Import your components or pages
import HomePage from './components/HomePage';
import GroceryPage from './components/GroceryPage';

// App component
function App() {
  // State to store data from the backend
  const [backendData, setBackendData] = useState(null);

  // Effect to fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'http://localhost:8000' with the actual URL of your FastAPI backend
        const response = await axios.get('http://localhost:8000/api/grocery/items');
        setBackendData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/HomePage">HomePage</Link>
          </li>
          <li>
            <Link to="/GroceryPage">GroceryPage</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/GroceryPage" element={<GroceryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
