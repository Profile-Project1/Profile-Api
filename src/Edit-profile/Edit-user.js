import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const EditUser = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  useEffect(() => {

    const fetchUserData = async () => {

      const fetchedUser = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: '',
      };
      setUser(fetchedUser);
    };

    fetchUserData();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Profile updated successfully');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={6} className="mx-auto">
          <Card className="shadow-lg rounded p-5" style={{ backgroundColor: '#ffffff' }}>
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Edit Profile</h3>
              
              {user ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="fullName" className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">Save Changes</Button>
                </Form>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
