import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // للتنقل إلى صفحة التسجيل

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Form Submitted', formData);
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col xs={12} sm={8} md={6} lg={6} className="mx-auto">
            <Card className="shadow-sm rounded p-4">
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      <FaEnvelope /> We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
  <Form.Label>Password</Form.Label>  {/* تأكد من إغلاق Form.Label */}
  <Form.Control
    type="password"
    placeholder="Enter password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
  />
  <Form.Text className="text-muted">
    <FaLock /> Make sure your password is secure.
  </Form.Text>
</Form.Group>


                  <Button variant="primary" type="submit" className="w-100 mt-3">
                    Login
                  </Button>
                </Form>

                <div className="mt-3 text-center">
                  <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
