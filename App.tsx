import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={`h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col ${!user ? 'overflow-hidden' : ''}`}>
      {!user ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
