import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Card } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaSearch, FaPlusCircle } from 'react-icons/fa'; // أيقونات التعديل والحذف والإضافة
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';  // استيراد Link من react-router-dom

const Dashboard = () => {
  // بيانات المستخدمين الافتراضية
  const [users, setUsers] = useState([
    { id: 1, name: 'odai ', email: 'john@example.com', role:"User" },
    { id: 2, name: 'ahmed ', email: 'jane@example.com', role:"User" },
    { id: 3, name: 'mohammed', email: 'tom@example.com', role:"User" },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // البحث عن مستخدم
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // تصفية المستخدمين بناءً على البحث
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حذف مستخدم
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // إضافة مستخدم جديد
  const handleAddAdmin = () => {
    alert("Add a new admin");
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col xs={12} sm={8} md={6} lg={10} className="mx-auto">
            <Card className="shadow-sm rounded p-4">
              <Card.Body>
                <h3 className="text-center mb-4">Dashboard</h3>

                {/* مربع البحث وزر إضافة مستخدم */}
                <Form.Label>Search User</Form.Label>

                <div className="d-flex justify-content-between mb-4">
                  <Form.Group controlId="search" className="w-75">
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <Button variant="outline-primary" className="ms-2">
                        <FaSearch />
                      </Button>
                    </div>
                  </Form.Group>
                  <Button variant="success" onClick={handleAddAdmin} className="d-flex align-items-center">
                    <FaPlusCircle className="me-2" /> Add Admin
                  </Button>
                </div>

                {/* جدول المستخدمين */}
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>

                        <td style={{ display: "flex", justifyContent: "end" }}>
                          <Button
                            variant="warning"
                            className="me-2"
                            style={{ fontSize: '16px', padding: '5px 15px' }}
                          >
                            {/* رابط التوجيه لصفحة تعديل الأدمن */}
                            <Link to={`/edit-admin/${user.id}`} className="text-white text-decoration-none">
                              <FaEdit /> Edit
                            </Link>
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(user.id)}
                            style={{ fontSize: '16px', padding: '5px 15px' }}
                          >
                            <FaTrashAlt /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
