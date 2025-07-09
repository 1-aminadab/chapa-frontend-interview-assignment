import React, { useState } from 'react';
import { FiUser, FiShield, FiStar, FiArrowRight } from 'react-icons/fi';
import { UserRole } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';

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

const AnimatedCircle = ({ index }: { index: number }) => {
  const size = Math.floor(Math.random() * 60 + 40);
  const startLeft = Math.random() * 100;
  const startTop = Math.random() * 100;
  const duration = Math.random() * 20 + 20;

  const generatePath = () => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      points.push({ x: `${x}%`, y: `${y}%` });
    }
    return points;
  };

  const path = generatePath();

  return (
    <motion.div
      key={index}
      className="absolute rounded-full bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-transparent blur-2xl"
      style={{
        width: size,
        height: size,
        left: `${startLeft}%`,
        top: `${startTop}%`,
        zIndex: 0,
      }}
      animate={{
        translateX: [0, ...path.map(p => p.x)],
        translateY: [0, ...path.map(p => p.y)],
        rotate: [0, 360],
        opacity: [0.15, 0.35, 0.15],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration,
        times: Array.from({ length: path.length + 1 }, (_, i) => i / path.length),
      }}
    />
  );
};

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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]" />
      {[...Array(7)].map((_, i) => (
        <AnimatedCircle key={`circle-${i}`} index={i} />
      ))}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-3xl p-8 backdrop-blur-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 dark:bg-white/5"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-blue-400 to-purple-400 text-transparent bg-clip-text mb-3">
            Chapa Role Selection
          </h1>
          <p className="text-gray-200 text-sm font-light">
            Choose your role to access the dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {roles.map((role) => {
            const isSelected = selectedRole === role.value;

            return (
              <motion.div
                key={role.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedRole(role.value)}
                className={`transition-all cursor-pointer text-center p-6 rounded-2xl border-2 backdrop-blur-md select-none 
                  ${isSelected
                    ? 'border-blue-500 bg-white/20 shadow-lg ring-2 ring-blue-400/30'
                    : 'border-white/10 hover:border-blue-400 hover:bg-white/10'
                  }`}
              >
                {role.icon}
                <h3 className="text-white font-semibold text-lg">{role.label}</h3>
                <p className="text-sm text-gray-300 mt-1">{role.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            size="large"
            className="flex items-center justify-center gap-2 w-2/3 md:w-1/2 py-3 text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              'Logging in...'
            ) : (
              <>
                Continue <FiArrowRight className="text-xl" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
