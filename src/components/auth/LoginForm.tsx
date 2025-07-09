
import React, { useState } from 'react';
import { FiUser, FiShield, FiStar } from 'react-icons/fi';
import { UserRole } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';

export const LoginForm: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(selectedRole);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <div className="w-full max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Chapa Payment Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select your role to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div 
            className={`p-6 border-2 rounded-xl text-center cursor-pointer transition-all duration-300 ${
              selectedRole === UserRole.USER 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-300 hover:shadow-sm'
            }`}
            onClick={() => setSelectedRole(UserRole.USER)}
          >
            <FiUser className="text-3xl text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">User</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage transactions and wallet</p>
          </div>

          <div 
            className={`p-6 border-2 rounded-xl text-center cursor-pointer transition-all duration-300 ${
              selectedRole === UserRole.ADMIN 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-300 hover:shadow-sm'
            }`}
            onClick={() => setSelectedRole(UserRole.ADMIN)}
          >
            <FiShield className="text-3xl text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Admin</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage users and payments</p>
          </div>

          <div 
            className={`p-6 border-2 rounded-xl text-center cursor-pointer transition-all duration-300 ${
              selectedRole === UserRole.SUPER_ADMIN 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-300 hover:shadow-sm'
            }`}
            onClick={() => setSelectedRole(UserRole.SUPER_ADMIN)}
          >
            <FiStar className="text-3xl text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Super Admin</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Full system access</p>
          </div>
        </div>

        <Button 
          onClick={handleLogin} 
          disabled={isLoading}
          size="large"
          className="w-full"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </div>
  );
};
