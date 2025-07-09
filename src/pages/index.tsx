
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/specific/auth/LoginForm';
import { Layout } from '../components/layout/Layout';
import { UserDashboard } from '@/components/specific/user/UserDashboard';
import { AdminDashboard } from '@/components/specific/admin/AdminDashboard';
import { SuperAdminDashboard } from '@/components/specific/admin/SuperAdminDashboard';
import { UserRole } from '../types';
import '@/styles/globals.css';

const Index = () => {
  const { isAuthenticated, currentUser } = useAuthStore();

  if (!isAuthenticated || !currentUser) {
    return <LoginForm />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case UserRole.USER:
        return <UserDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.SUPER_ADMIN:
        return <SuperAdminDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Index;
