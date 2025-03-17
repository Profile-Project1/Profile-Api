import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaEdit, FaSignOutAlt } from 'react-icons/fa'; // أيقونات التعديل وتسجيل الخروج
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  // بيانات المستخدم الافتراضية
  const user = {
    fullName: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  };

  // إجراء تعديل الملف الشخصي
  const handleEditProfile = () => {
    alert("Edit Profile");
  };

  // إجراء تسجيل الخروج
  const handleLogout = () => {
    alert("Logged out");
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col xs={12} sm={8} md={6} lg={10} className="mx-auto">
            <Card className="shadow-sm rounded p-4">
              <Card.Body>
                <h3 className="text-center mb-4">Home</h3>

                {/* عرض بيانات المستخدم */}
                <div className="mb-4">
                  <h5><strong>Full Name:</strong> {user.fullName}</h5>
                  <h5><strong>Email:</strong> {user.email}</h5>
                  <h5><strong>User Role:</strong> {user.role}</h5>
                </div>

                {/* أزرار التعديل وتسجيل الخروج */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="warning"
                    onClick={handleEditProfile}
                    className="d-flex align-items-center"
                    style={{ fontSize: '16px', padding: '5px 15px' }}
                  >
                    <FaEdit className="me-2" /> Edit Profile
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="d-flex align-items-center"
                    style={{ fontSize: '16px', padding: '5px 15px' }}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
