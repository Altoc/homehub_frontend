import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Form } from 'react-bootstrap';  // Imported components from react-bootstrap
import axios from 'axios';

const GroceryPage = () => {
  // State variables using the useState hook
  const [groceryLists, setGroceryLists] = useState([]);
  const [newListName, setNewListName] = useState('');  
  const [editingListId, setEditingListId] = useState(null);
  const [editedItems, setEditedItems] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Fetch existing grocery lists from the backend when the component mounts
    fetchGroceryLists();
  }, []);

  // Function to fetch grocery lists from the backend
  const fetchGroceryLists = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/grocery/list/active_grocery_lists');
      setGroceryLists(response.data.active_grocery_lists);
    } catch (error) {
      console.error('Error fetching grocery lists:', error);
    }
  };

  // Event handler for the "Create List" button click
  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  // Function to handle creating a new grocery list
  const handleCreateList = async () => {
    try {
      const currentDate = new Date().toISOString();  // Get the current date in ISO format
      await axios.post('http://127.0.0.1:8000/api/grocery/list/create', { name: newListName, items: editedItems, created_at: currentDate });

      // Refresh the grocery lists after creating a new one
      fetchGroceryLists();
      // Clear the input fields and hide the form
      setNewListName('');
      setEditedItems([]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating new grocery list:', error);
    }
  };

  // Function to delete a grocery list
  const deleteList = async (listId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/grocery/list/deactivate/${listId}`);
      // Refresh the grocery lists after deleting one
      fetchGroceryLists();
    } catch (error) {
      console.error('Error deleting grocery list:', error);
    }
  };

  // Function to toggle editing mode for a grocery list
  const toggleEditingMode = (listId) => {
    if (editingListId === listId) {
      setEditingListId(null);
      setEditedItems([]);
    } else {
      let itemList
      groceryLists.forEach((list) => {
        list.forEach((innerList) => {
          if(listId == innerList){
            itemList = list
            return;
          }
        })
      })
  
      // Check if a matching list is found
      if (itemList) {
        setEditingListId(listId);
        setEditedItems(itemList.items);
      } else {
        console.error("itemList not found for listId: " + listId);
        // Handle the case where no matching list is found
      }
    }
  };

  // Function to save edited items for a grocery list
  const saveEditedItems = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/grocery/list/edit/${editingListId}`, { items: editedItems });
      // Exit editing mode and refresh the grocery lists
      toggleEditingMode(editingListId);
      fetchGroceryLists();
    } catch (error) {
      console.error('Error saving edited items:', error);
    }
  };

  // Function to add a new item to the edited items list
  const addItem = () => {
    // Add an empty string as a placeholder for a new grocery item
    setEditedItems([...editedItems, '']);
  };

 

  // JSX rendering of the component
  return (
    <div className="container mt-4">
      <h2>Grocery Lists</h2>
      {/* Create New List section */}
      <Button variant="primary" onClick={handleCreateClick}>
        Create List
      </Button>

      {showCreateForm && (
        <div className="mt-4">
          <h3>Create New List</h3>
          <Form>
            <Form.Group>
              <Form.Label>List Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter list name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Items:</Form.Label>
              {editedItems.map((item, index) => (
                <div key={index} className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Enter grocery item"
                    value={item}
                    onChange={(e) => {
                      const updatedItems = [...editedItems];
                      updatedItems[index] = e.target.value;
                      setEditedItems(updatedItems);
                    }}
                  />
                </div>
              ))}
              <Button variant="primary" size="sm" className="float-right" onClick={handleCreateList}>
                Save
              </Button>
              <Button variant="secondary" size="sm" className="float-right mr-2" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </div>
      )}
    <h3 className="mt-4">Existing Lists</h3>
    {groceryLists.length === 0 ? (
      <p>No grocery lists available.</p>
    ) : (
      <ListGroup className="mt-2">
        {groceryLists.map((list) => (
          <ListGroup.Item key={list[0]}>
            {/*if this list entry id matches the editting list id, do editting stuff*/}
            {editingListId === list[0] ? (
              <>
                {editedItems.map((item, index) => (
                  <div key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Enter grocery item"
                      value={item}
                      onChange={(e) => {
                        const updatedItems = [...editedItems];
                        updatedItems[index] = e.target.value;
                        setEditedItems(updatedItems);
                      }}
                    />
                  </div>
                ))}
                <Button variant="success" size="sm" className="float-right" onClick={saveEditedItems}>
                  Save
                </Button>
                <Button variant="primary" size="sm" className="float-right mr-2" onClick={addItem}>
                  Add Item
                </Button>
              </>
            ) : (
            //non-editting stuff:
              <>
                <strong>{list[1]}</strong>
                <br></br>
                <Button variant="danger" size="sm" className="float-right" onClick={() => deleteList(list[0])}>
                  Delete
                </Button>
                <Button variant="warning" size="sm" className="float-right" onClick={() => toggleEditingMode(list[0])}>
                  Edit
                </Button>
                {/* Display grocery items for the current list */}
                {list[3] && list[3].length > 0 && (
                  <div className="mt-2">
                    Items:
                    <ListGroup className="mt-2">
                      {list.slice(3).map((element, index) => (
                        <ListGroup.Item key={element[0]}>{element[1]}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                )}
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
  </div>
);
};

export default GroceryPage;
