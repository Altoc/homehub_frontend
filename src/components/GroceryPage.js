import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const GroceryPage = () => {
  const [groceryLists, setGroceryLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    // Fetch existing grocery lists from the backend when the component mounts
    fetchGroceryLists();
  }, []);

  const fetchGroceryLists = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/grocery/list/active_grocery_lists');
      setGroceryLists(response.data.active_grocery_lists);
    } catch (error) {
      console.error('Error fetching grocery lists:', error);
    }
  };

  const createNewList = async () => {
    try {
      await axios.post('YOUR_BACKEND_API_URL/grocery-lists', { name: newListName });
      // Refresh the grocery lists after creating a new one
      fetchGroceryLists();
      // Clear the input field
      setNewListName('');
    } catch (error) {
      console.error('Error creating new grocery list:', error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await axios.delete(`YOUR_BACKEND_API_URL/grocery-lists/${listId}`);
      // Refresh the grocery lists after deleting one
      fetchGroceryLists();
    } catch (error) {
      console.error('Error deleting grocery list:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Grocery Lists</h2>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Create New List</Card.Title>
          <Card.Text>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Button variant="primary" onClick={createNewList}>
              Create List
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>

      <h3 className="mt-4">Existing Lists</h3>
      {groceryLists.length === 0 ? (
        <p>No grocery lists available.</p>
      ) : (
        <ListGroup className="mt-2">
          {groceryLists.map((list) => (
            <ListGroup.Item key={list.id}>
              {list.name}
              <Button variant="danger" size="sm" className="float-right" onClick={() => deleteList(list.id)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default GroceryPage;
