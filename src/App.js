import React from 'react';
import { Route, Routes ,Navigate  } from 'react-router-dom';  // استيراد Routes و Route
import Register from './Register/Register';  // استيراد صفحة التسجيل
import Login from './Login/Login';  // استيراد صفحة تسجيل الدخول
import Dashboard from './Dashboard/Dashboard';
import Home from './Home/Home';
import EditUser from "./Edit-profile/Edit-user"
import EditAdmin from "./Edit-profile/Edit-admin"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       

        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Home />} />
        <Route path="/edit-user/:id" element={<EditUser/>} />
        <Route path="/edit-admin/:id" element={<EditAdmin/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
