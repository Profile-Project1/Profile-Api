import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // للتنقل بين الصفحات
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null); // لتخزين رسالة الخطأ أو النجاح
  const [variant, setVariant] = useState('danger'); // لون الرسالة

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, 
      });

      // استخراج البيانات من الاستجابة
      const { message, token, role } = response.data;

      if (token) {
        localStorage.setItem('token', token); // حفظ التوكن
        setMessage(message);
        setVariant('success');

        // التوجيه بناءً على الدور مباشرة بعد تسجيل الدخول
        if (role === 'Admin') {
          navigate('/dashboard'); 
        } else if (role === 'User') {
          navigate('/users'); 
        }
      } else {
        setMessage('Login failed: Token not received.');
        setVariant('danger');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setVariant('danger');
    }
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col xs={12} sm={8} md={6} lg={5} className="mx-auto">
            <Card className="shadow-sm rounded p-4">
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                
                {message && <Alert variant={variant}>{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label><FaEnvelope /> Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label><FaLock /> Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mt-3">
                    Login
                  </Button>
                </Form>

                <div className="mt-3 text-center">
                  <p>Don't have an account? <Link to="/register">Register here</Link></p>
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
