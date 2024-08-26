import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../api/UserApi';
import UserList from './UserList';
import UpdateUserModal from './UpdateUserModel'; // Modal component for updating user details
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'; // Import Bootstrap components
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        setMessage('Failed to fetch users.');
      }
    };
    getUsers();
  }, []);

  const handleUpdate = async (userData) => {
    try {
      const response = await updateUser(selectedUser._id, userData);
      setUsers(users.map(user => user._id === selectedUser._id ? response.data.user : user));
      setSelectedUser(null);
      setMessage('User updated successfully.');
    } catch (error) {
      setMessage('Failed to update user.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      setMessage('User deleted successfully.');
    } catch (error) {
      setMessage('Failed to delete user.');
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleRegisterClick = () => {
    navigate('/'); // Navigate to the Register page
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <Container fluid className="mt-5">
      <Row className="mb-4">
        <Col md={12} className="d-flex justify-content-between align-items-center">
          <h2 className="text-center">User Management Dashboard</h2>
          <div>
            <Button variant="primary" onClick={handleRegisterClick} className="me-2">
              Register
            </Button>
            <Button variant="secondary" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              {message && <Alert variant="info">{message}</Alert>}
              <UserList 
                users={users} 
                onEdit={handleEditClick} 
                onDelete={handleDelete} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for updating user details */}
      {selectedUser && (
        <UpdateUserModal 
          user={selectedUser} 
          onUpdate={handleUpdate} 
          onClose={handleCloseModal} 
        />
      )}
    </Container>
  );
};

export default Home;
