
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiBarChart, FiTrendingUp } from 'react-icons/fi';
import { useAppStore } from '../../store/appStore';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { UserRole } from '../../types';
import { AdminDashboard } from './AdminDashboard';

export const SuperAdminDashboard: React.FC = () => {
  const { users, systemStats, addAdmin, removeAdmin } = useAppStore();
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    walletBalance: 0
  });

  const admins = users.filter(user => user.role === UserRole.ADMIN);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin({
      ...adminForm,
      role: UserRole.ADMIN,
      isActive: true
    });
    setAdminForm({ name: '', email: '', walletBalance: 0 });
    setShowAddAdminForm(false);
  };

  const handleRemoveAdmin = (adminId: string) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      removeAdmin(adminId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="System Statistics">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiBarChart className="text-2xl text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {systemStats.totalPayments.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Payments
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiTrendingUp className="text-2xl text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {systemStats.activeUsers.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Active Users
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiBarChart className="text-2xl text-purple-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ETB {systemStats.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiTrendingUp className="text-2xl text-orange-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {systemStats.monthlyGrowth}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Growth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Admin Management">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowAddAdminForm(!showAddAdminForm)}
                variant="primary"
                size="small"
                className="flex items-center gap-2"
              >
                <FiPlus />
                Add Admin
              </Button>
            </div>

            {showAddAdminForm && (
              <form onSubmit={handleAddAdmin} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={adminForm.name}
                      onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Initial Balance
                  </label>
                  <input
                    type="number"
                    value={adminForm.walletBalance}
                    onChange={(e) => setAdminForm({ ...adminForm, walletBalance: parseFloat(e.target.value) })}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="submit" variant="primary" size="small">Add Admin</Button>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="small"
                    onClick={() => setShowAddAdminForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {admins.map((admin) => (
                <div key={admin.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900 dark:text-white">{admin.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{admin.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">Joined: {admin.joinedDate}</div>
                  </div>
                  <Button
                    onClick={() => handleRemoveAdmin(admin.id)}
                    variant="danger"
                    size="small"
                    className="flex items-center gap-2"
                  >
                    <FiTrash2 />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <AdminDashboard />
    </div>
  );
};
