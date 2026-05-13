import React, { useState } from 'react';
import { UserRole } from '../types';
import { login } from '../services/authService';
import { Button } from './Button';
import { Input } from './Input';
import { User as UserIcon, Lock, GraduationCap, BookOpen, Calendar, School } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: (user: import('../types').User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.STUDENT);
  const [id, setId] = useState('');
  const [dob, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await login(id, dob, activeRole);
      onLoginSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    setError(null);
  };

  const isStudent = activeRole === UserRole.STUDENT;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-4">
      
      {/* 1. Unified Branding Header */}
      <header className="w-full flex flex-col items-center mb-6 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="w-36 h-36 sm:w-44 sm:h-44 mb-4 relative flex items-center justify-center bg-white rounded-full shadow-xl p-3 border-4 border-white overflow-hidden">
          {!imgError ? (
            <img 
              src="./kh-logo.png"
              alt="School Logo" 
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <School className="w-16 h-16 text-gray-200" />
          )}
        </div>
        
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
            K.H. MATRICULATION
          </h1>
          <p className="text-sm sm:text-lg font-bold text-gray-600 uppercase tracking-tight">
            Boys Higher Secondary School
          </p>
          <div className="inline-block px-3 py-0.5 bg-gray-100 rounded-full">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Then Nandiyalam
            </p>
          </div>
        </div>
      </header>

      {/* 2. Sleek Login Card */}
      <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/80 border border-gray-50 overflow-hidden">
        {/* Active Theme Bar */}
        <div className={`h-1.5 w-full transition-colors duration-500 ${isStudent ? 'bg-green-500' : 'bg-blue-600'}`}></div>

        <div className="p-6 sm:p-8">
          {/* Professional Role Switcher (Pill Style) */}
          <div className="relative flex p-1 bg-gray-100 rounded-2xl mb-8">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] transition-all duration-300 ease-out rounded-xl shadow-sm ${
                isStudent ? 'left-1 bg-white' : 'left-[calc(50%+4px)] bg-white'
              }`}
            />
            <button
              onClick={() => handleRoleChange(UserRole.STUDENT)}
              className={`relative z-10 flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
                isStudent ? 'text-green-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>
            <button
              onClick={() => handleRoleChange(UserRole.TEACHER)}
              className={`relative z-10 flex-1 py-2.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
                !isStudent ? 'text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Teacher</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label={isStudent ? "Roll Number" : "Teacher Code"}
              placeholder={isStudent ? "e.g. 10306" : "e.g. TCH001"}
              value={id}
              onChange={(e) => setId(e.target.value)}
              icon={<Lock className="w-5 h-5 opacity-40" />}
              required
              className="bg-gray-50/50 border-gray-100 focus-within:bg-white focus-within:border-gray-200 transition-all"
            />
            
            <Input
              label={isStudent ? "Date of Birth" : "Passcode"}
              type={isStudent ? "date" : "password"}
              placeholder={isStudent ? "DD/MM/YYYY" : "Enter your passcode"}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              icon={isStudent ? <Calendar className="w-5 h-5 opacity-40" /> : <Lock className="w-5 h-5 opacity-40" />}
              required
              className="bg-gray-50/50 border-gray-100 focus-within:bg-white focus-within:border-gray-200 transition-all"
            />

            {error && (
              <div className="flex items-center gap-2 p-3 text-[11px] font-bold text-red-600 bg-red-50 rounded-xl border border-red-100 animate-in fade-in zoom-in-95">
                <div className="flex-shrink-0 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]">!</div>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
              className={`h-14 rounded-2xl text-base font-black transition-all transform active:scale-[0.98] shadow-lg ${
                isStudent 
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
              }`}
            >
              {isLoading ? 'SECURELY LOGGING IN...' : 'LOGIN TO DASHBOARD'}
            </Button>
          </form>
        </div>
      </div>

      {/* 3. Minimal Footer */}
      <footer className="mt-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-gray-100 rounded-2xl">
          <span className={`w-2 h-2 rounded-full ${isStudent ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`} />
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Tip: {isStudent ? 'Use Class + Sec + Roll (e.g. 10306)' : 'Enter your Teacher Code & Passcode'}
          </p>
        </div>
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          © {new Date().getFullYear()} K.H. School System
        </p>
      </footer>
    </div>
  );
};
