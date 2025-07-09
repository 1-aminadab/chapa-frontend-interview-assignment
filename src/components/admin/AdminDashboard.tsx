import React from 'react';
import {
  FiUsers,
  FiDollarSign,
  FiToggleLeft,
  FiToggleRight,
} from 'react-icons/fi';
import { useAppStore } from '../../store/appStore';
import { Button } from '../common/Button';
import { UserRole } from '../../types';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { users, updateUserStatus } = useAppStore();

  const regularUsers = users.filter((user) => user.role === UserRole.USER);
  const totalUserPayments = regularUsers.reduce(
    (sum, user) => sum + user.walletBalance,
    0
  );

  const chartData = regularUsers.slice(0, 10).map((user) => ({
    name: user.name,
    balance: user.walletBalance,
  }));

  const handleToggleUserStatus = (
    userId: string,
    currentStatus: boolean
  ) => {
    updateUserStatus(userId, !currentStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 space-y-6 text-gray-900 dark:text-white rounded-lg">
      {/* Stats + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            User Stats
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <div className="flex items-center gap-3">
                <FiUsers className="text-cyan-500 text-xl" />
                <div>
                  <h3 className="text-xl font-bold">{regularUsers.length}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <div className="flex items-center gap-3">
                <FiDollarSign className="text-emerald-500 text-xl" />
                <div>
                  <h3 className="text-xl font-bold">
                    ETB {totalUserPayments.toLocaleString()}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Balance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Balance Overview
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
              />
              <CartesianGrid stroke="#e5e7eb33" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#4f46e5',
                  color: '#fff',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          User Management
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Balance</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {regularUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    ETB {user.walletBalance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-400/10 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-300'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      onClick={() =>
                        handleToggleUserStatus(user.id, user.isActive)
                      }
                      variant={user.isActive ? 'danger' : 'success'}
                      size="small"
                      className="flex items-center gap-1 px-3 py-1 text-sm rounded-md"
                    >
                      {user.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
