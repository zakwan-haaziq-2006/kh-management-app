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
    <div className={`h-screen bg-gradient-to-br from-sky-100 via-white to-emerald-50 flex flex-col ${!user ? 'overflow-hidden' : ''}`}>
      {!user ? (
        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Floating playful background shapes */}
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-sky-200/50 blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-amber-200/50 blur-3xl animate-blob" style={{ animationDelay: '3s' }}></div>
            <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full bg-emerald-200/50 blur-3xl animate-blob" style={{ animationDelay: '6s' }}></div>
          </div>
          <div className="relative z-10 w-full flex items-center justify-center">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
