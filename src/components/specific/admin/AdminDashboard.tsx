
import React from 'react';
import { FiUsers, FiDollarSign, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { useAppStore } from '@/store/appStore';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { UserRole } from '@/types';

export const AdminDashboard: React.FC = () => {
  const { users, updateUserStatus } = useAppStore();

  const regularUsers = users.filter(user => user.role === UserRole.USER);
  const totalUserPayments = regularUsers.reduce((sum, user) => sum + user.walletBalance, 0);

  const handleToggleUserStatus = (userId: string, currentStatus: boolean) => {
    updateUserStatus(userId, !currentStatus);
  };

  return (
    <div className="dashboard admin-dashboard">
      <div className="dashboard-grid">
        <Card title="User Statistics" className="stats-card">
          <div className="stats-content">
            <div className="stat-item">
              <FiUsers className="stat-icon" />
              <div className="stat-details">
                <span className="stat-value">{regularUsers.length}</span>
                <span className="stat-label">Total Users</span>
              </div>
            </div>
            <div className="stat-item">
              <FiDollarSign className="stat-icon" />
              <div className="stat-details">
                <span className="stat-value">ETB {totalUserPayments.toLocaleString()}</span>
                <span className="stat-label">Total User Balances</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="User Management" className="user-management-card">
          <div className="users-table">
            <div className="table-header">
              <span>User</span>
              <span>Balance</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {regularUsers.map((user) => (
              <div key={user.id} className="table-row">
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <span className="user-balance">ETB {user.walletBalance.toLocaleString()}</span>
                <span className={`user-status ${user.isActive ? 'active' : 'inactive'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
                <Button
                  onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                  variant={user.isActive ? 'danger' : 'success'}
                  size="small"
                  className="toggle-button"
                >
                  {user.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Payment Summary" className="payment-summary-card">
          <div className="payment-summary">
            {regularUsers.map((user) => (
              <div key={user.id} className="payment-item">
                <div className="payment-user">
                  <span className="user-name">{user.name}</span>
                  <span className="join-date">Joined: {user.joinedDate}</span>
                </div>
                <div className="payment-amount">
                  <span className="amount">ETB {user.walletBalance.toLocaleString()}</span>
                  <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
