import React, { useState } from 'react';
import { FiUser, FiShield, FiStar, FiArrowRight, FiMail, FiLock, FiKey } from 'react-icons/fi';
import { UserRole } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { fail } from 'assert';

const roles = [
  {
    label: 'User',
    icon: <FiUser className="text-3xl text-blue-500 mx-auto mb-3" />,
    description: 'Manage transactions and wallet',
    value: UserRole.USER,
  },
  {
    label: 'Admin',
    icon: <FiShield className="text-3xl text-blue-500 mx-auto mb-3" />,
    description: 'Manage users and payments',
    value: UserRole.ADMIN,
  },
  {
    label: 'Super Admin',
    icon: <FiStar className="text-3xl text-blue-500 mx-auto mb-3" />,
    description: 'Full system access',
    value: UserRole.SUPER_ADMIN,
  },
];

export const LoginForm: React.FC = () => {
  const { login } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);

  const [form, setForm] = useState({
    email: 'admin@chapa.com', // for dev testing
    password: 'admin123',
    twoFA: '',
    accessCode: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    twoFA: '',
    accessCode: '',
    failed: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {
      email: '',
      password: '',
      twoFA: '',
      accessCode: '',
      failed: '',
    };

    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (form.password.length < 6) newErrors.password = 'Password too short';
    if ((selectedRole === UserRole.ADMIN || selectedRole === UserRole.SUPER_ADMIN) && form.twoFA.length !== 6)
      newErrors.twoFA = '2FA code must be 6 digits';
    if (selectedRole === UserRole.SUPER_ADMIN && form.accessCode.trim() === '')
      newErrors.accessCode = 'Access code required';

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      await login(selectedRole, form.email);
    } catch (error) {
      const errorMessage = 'Login failed. Please check your credentials.';
      setErrors((prev) => ({ ...prev, failed: errorMessage }));
      console.log('Login error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl p-8 rounded-2xl"
      >
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-blue-400 to-purple-400 text-transparent bg-clip-text mb-3">
            Chapa Login
          </h1>
          <p className="text-gray-300 text-sm font-light">Secure role-based access</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {roles.map((role) => {
            const isSelected = selectedRole === role.value;
            return (
              <motion.div
                key={role.value}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedRole(role.value)}
                className={clsx(
                  'cursor-pointer p-4 rounded-xl border transition-all text-center',
                  isSelected
                    ? 'bg-blue-500/10 border-blue-400 shadow-lg'
                    : 'border-white/10 hover:border-blue-300 hover:bg-white/10'
                )}
              >
                {role.icon}
                <h3 className="text-white font-semibold">{role.label}</h3>
                <p className="text-sm text-gray-400">{role.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-black/30 text-white rounded-md pl-10 pr-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-black/30 text-white rounded-md pl-10 pr-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* 2FA Code */}
          {(selectedRole === UserRole.ADMIN || selectedRole === UserRole.SUPER_ADMIN) && (
            <div className="relative">
              <input
                type="text"
                placeholder="2FA Code"
                value={form.twoFA}
                onChange={(e) => setForm({ ...form, twoFA: e.target.value })}
                maxLength={6}
                className="w-full bg-black/30 text-white rounded-md pl-10 pr-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <FiKey className="absolute left-3 top-3.5 text-gray-400" />
              {errors.twoFA && <p className="text-red-400 text-sm mt-1">{errors.twoFA}</p>}
            </div>
          )}

          {/* Access Code (Only Super Admin) */}
          {selectedRole === UserRole.SUPER_ADMIN && (
            <div className="relative">
              <input
                type="password"
                placeholder="Access Code"
                value={form.accessCode}
                onChange={(e) => setForm({ ...form, accessCode: e.target.value })}
                className="w-full bg-black/30 text-white rounded-md pl-10 pr-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
              <FiKey className="absolute left-3 top-3.5 text-purple-300" />
              {errors.accessCode && <p className="text-red-400 text-sm mt-1">{errors.accessCode}</p>}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 flex justify-center flex-col">
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            size="large"
            className="w-full md:w-2/3 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-xl"
          >
            {isLoading ? 'Logging in...' : (
              <>
                Continue <FiArrowRight className="ml-2" />
              </>
            )}
          </Button>
          {errors.failed && <p className="text-red-400 text-sm mt-1">{errors.failed}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
};
