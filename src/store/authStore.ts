import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, UserRole } from '../types';
import { Toaster } from 'sonner';

// Mock users for different roles
const mockUsers: Record<UserRole, User> = {
  [UserRole.USER]: {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    role: UserRole.USER,
    isActive: true,
    walletBalance: 2500.50,
    joinedDate: '2024-01-15',
    password: 'userpass'

    
  },
  [UserRole.ADMIN]: {
    id: '2',
    name: 'Jane Smith',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    isActive: true,
    walletBalance: 5000.00,
    joinedDate: '2023-08-20',
    password: 'adminpass'

  },
  [UserRole.SUPER_ADMIN]: {
    id: '3',
    name: 'Alex Johnson',
    email: 'subAdmin@example.com',
    role: UserRole.SUPER_ADMIN,
    isActive: true,
    walletBalance: 10000.00,
    joinedDate: '2023-01-10',
    password: 'superpass'
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,

      // Updated login function to accept role and email
      login: async (role: UserRole, email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers[role];

        // Check if email matches the expected one for that role
        if (user && user.email === email && user.password === password) {
          set({
            currentUser: user,
            isAuthenticated: true
          });
        } else {
          // Optional: throw or return false
          throw new Error('Invalid email for selected role.');
        }
      },

      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false
        });
      },

      updateUser: (updatedUser: User) => {
        set((state) => ({
          currentUser: state.currentUser ? { ...state.currentUser, ...updatedUser } : updatedUser
        }));
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
