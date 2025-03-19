import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // حذف التوكن من localStorage
    localStorage.removeItem('token');

    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    navigate('/login');
  }, [navigate]);

  return <div>Logging out...</div>;
}
