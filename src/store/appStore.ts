
import { create } from 'zustand';
import { AppState, User, Transaction, SystemStats, UserRole, TransactionType, TransactionStatus } from '../types';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.USER,
    isActive: true,
    walletBalance: 2500.50,
    joinedDate: '2024-01-15'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: UserRole.USER,
    isActive: true,
    walletBalance: 1800.25,
    joinedDate: '2024-02-10'
  },
  {
    id: '5',
    name: 'Mike Brown',
    email: 'mike@example.com',
    role: UserRole.USER,
    isActive: false,
    walletBalance: 950.75,
    joinedDate: '2024-03-05'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: UserRole.ADMIN,
    isActive: true,
    walletBalance: 5000.00,
    joinedDate: '2023-08-20'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 250.00,
    type: TransactionType.SEND,
    status: TransactionStatus.COMPLETED,
    date: '2024-07-07',
    description: 'Payment to merchant',
    recipientName: 'Amazon Store'
  },
  {
    id: '2',
    amount: 100.50,
    type: TransactionType.RECEIVE,
    status: TransactionStatus.COMPLETED,
    date: '2024-07-06',
    description: 'Refund from store',
    recipientName: 'Tech Store'
  },
  {
    id: '3',
    amount: 75.25,
    type: TransactionType.WITHDRAWAL,
    status: TransactionStatus.PENDING,
    date: '2024-07-05',
    description: 'ATM withdrawal'
  }
];

const mockSystemStats: SystemStats = {
  totalPayments: 125000,
  activeUsers: 1250,
  totalRevenue: 2500000,
  monthlyGrowth: 12.5
};

export const useAppStore = create<AppState>((set, get) => ({
  users: mockUsers,
  transactions: mockTransactions,
  systemStats: mockSystemStats,
  
  updateUserStatus: (userId: string, isActive: boolean) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, isActive } : user
      )
    }));
  },
  
  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    set((state) => ({
      transactions: [newTransaction, ...state.transactions]
    }));
  },
  
  addAdmin: (userData) => {
    const newAdmin: User = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    set((state) => ({
      users: [...state.users, newAdmin]
    }));
  },
  
  removeAdmin: (userId: string) => {
    set((state) => ({
      users: state.users.filter(user => !(user.id === userId && user.role === UserRole.ADMIN))
    }));
  }
}));
