import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaUserTag } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'User',
    address: '',
    phone: ''
  });

  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState('danger');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match!");
      setVariant("danger");
      return;
    }
    try {
      await axios.post('http://localhost:3000/register', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      setMessage('Registration successful! Redirecting...');
      setVariant('success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
      setVariant('danger');
    }
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }} >
      <Container className="d-flex justify-content-center align-items-center " style={{ minHeight: '100vh' }}>
        <Row className="w-100 my-3">
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            <Card className="shadow-sm rounded p-4">
              <Card.Body>
                <h3 className="text-center mb-4">Create Account</h3>
                {message && <Alert variant={variant}>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="first_name" className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="last_name" className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="userName" className="mb-3">
                        <Form.Label><FaUser /> Username</Form.Label>
                        <Form.Control type="text" name="userName" value={formData.userName} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email" className="mb-3">
                        <Form.Label><FaEnvelope /> Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="password" className="mb-3">
                        <Form.Label><FaLock /> Password</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="confirm_password" className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="address" className="mb-3">
                        <Form.Label><FaHome /> Address</Form.Label>
                        <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="phone" className="mb-3">
                        <Form.Label><FaPhone /> Phone</Form.Label>
                        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="role" className="mb-3">
                    <Form.Label><FaUserTag /> Role</Form.Label>
                    <Form.Control disabled as="select" name="role" value={formData.role} onChange={handleChange}>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100 mt-3">Register</Button>
                </Form>
                <div className="mt-3 text-center">
                  <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
