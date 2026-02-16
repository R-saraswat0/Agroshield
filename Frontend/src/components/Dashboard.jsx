import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserSideNavbar from './UserSideNavbar';
import UserTopNavbar from './UserTopNavbar';

const Dashboard = () => {
  const [user, setUser] = useState({ name: 'Guest' });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { username, role, fullName } = JSON.parse(userData);
      
      // Redirect admin/manager to their dashboards
      if (role === 'admin') {
        navigate('/admin');
        return;
      }
      if (role === 'manager') {
        navigate('/manager-dashboard');
        return;
      }
      if (role === 'supplier') {
        navigate('/materials');
        return;
      }
      
      setUser({ name: username, role, fullName });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      <UserTopNavbar user={user} />
      <div className="flex flex-1 overflow-hidden">
        <div className="pt-1">
          <UserSideNavbar user={user} />
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;