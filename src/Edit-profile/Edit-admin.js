import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const EditAdmin = () => {
  const { userId } = useParams(); // الحصول على userId من الـ URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    // افتراض أنك تجلب بيانات المستخدم من API أو من مصدر بيانات
    const fetchUserData = async () => {
      // هنا سنحاكي جلب بيانات المستخدم عبر الـ userId
      const fetchedUser = {
        id: userId,
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin', // فرضًا المستخدم هو "مسؤول"
      };
      setUser(fetchedUser);
    };

    fetchUserData();
  }, [userId]);

  // التعامل مع التغيير في النموذج
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إرسال البيانات إلى الخادم لتحديثها
    alert('Admin profile updated successfully');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={6} className="mx-auto">
          <Card className="shadow-lg rounded p-5" style={{ backgroundColor: '#ffffff' }}>
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Edit Admin</h3>
              
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

                  <Form.Group controlId="role" className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      name="role"
                      value={user.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </Form.Control>
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

export default EditAdmin;
