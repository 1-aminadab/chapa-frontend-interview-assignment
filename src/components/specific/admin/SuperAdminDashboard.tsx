import React, { useState } from 'react';
import {
  FiPlus,
  FiTrash2,
  FiBarChart,
  FiTrendingUp,
} from 'react-icons/fi';
import { useAppStore } from '../../../store/appStore';
import { Button } from '../../common/Button';
import { UserRole } from '../../../types';
import { AdminDashboard } from './AdminDashboard';

export const SuperAdminDashboard: React.FC = () => {
  const { users, systemStats, addAdmin, removeAdmin } = useAppStore();
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    walletBalance: 0,
  });

  const admins = users.filter((user) => user.role === UserRole.ADMIN);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin({
      ...adminForm,
      role: UserRole.ADMIN,
      isActive: true,
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
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6 space-y-6 text-gray-900 dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Statistics */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            System Statistics
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiBarChart className="text-2xl text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">
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
                  <div className="text-2xl font-bold">
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
                  <div className="text-2xl font-bold">
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
                  <div className="text-2xl font-bold">{systemStats.monthlyGrowth}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Growth
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Management */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Admin Management
          </h2>

          <div className="flex justify-end mb-4">
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
            <form
              onSubmit={handleAddAdmin}
              className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={adminForm.name}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={adminForm.email}
                    onChange={(e) =>
                      setAdminForm({ ...adminForm, email: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
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
                  onChange={(e) =>
                    setAdminForm({
                      ...adminForm,
                      walletBalance: parseFloat(e.target.value),
                    })
                  }
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="submit" variant="primary" size="small">
                  Add Admin
                </Button>
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

          <div className="space-y-3 mt-6">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium">{admin.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {admin.email}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    Joined: {admin.joinedDate}
                  </div>
                </div>
                <Button
                  onClick={() => handleRemoveAdmin(admin.id)}
                  variant="destructive"
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
      </div>

      {/* Embed Admin Dashboard */}
      <AdminDashboard />
    </div>
  );
};
