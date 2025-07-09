export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum TransactionType {
  SEND = 'send',
  RECEIVE = 'receive',
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  walletBalance: number;
  joinedDate: string;
  password?: string; // Optional for login purposes
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  description: string;
  recipientId?: string;
  recipientName?: string;
}

export interface SystemStats {
  totalPayments: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;  // Added updateUser here

}

export interface AppState {
  users: User[];
  transactions: Transaction[];
  systemStats: SystemStats;
  updateUserStatus: (userId: string, isActive: boolean) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  addAdmin: (userData: Omit<User, 'id' | 'joinedDate'>) => void;
  removeAdmin: (userId: string) => void;
  updateUser: (updatedUser: User) => void;  // Added updateUser here as well
}
