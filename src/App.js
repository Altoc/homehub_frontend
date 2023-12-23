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
        const response = await axios.get('http://127.0.0.1:8000/api/grocery/items/5');
        console.log('Response from backend:', response);

        // Check the structure of the data received
        console.log('Data from backend:', response.data.name);

        // Set the data to the state
        setBackendData(response.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Home Hub</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/HomePage">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/GroceryPage">Grocery List</a>
          </li>
        </ul>
      </div>
    </nav>

      <Routes>
        <Route path="/" element={<NavigateHome />} />
        <Route path="/HomePage" element={<HomePage backendData={backendData}/>} />
        <Route path="/GroceryPage" element={<GroceryPage backendData={backendData}/>} />
      </Routes>
    </Router>
  );
}

function NavigateHome() {
  useEffect(() => {
    // Redirect to /HomePage when the component mounts
    window.location.replace('/HomePage');
  }, []);

  // Return null or a component for the redirected route
  return null;
}

export default App;
