# 📊 Chapa Role-Based Dashboard (Frontend Developer Test Task)

This is a professional single-page application (SPA) built with **React** and **TypeScript**, simulating a role-based dashboard for a fictional Payment Service Provider platform. The application is entirely mock-driven and showcases features such as simulated login, wallet management, and admin/super-admin control panels.

---

## 🧾 Features

- 🔐 **Role-Based Authentication**: Supports User, Admin, and Super Admin roles.
- 💳 **Wallet Management**: Users can view balances and transaction histories.
- 🛠️ **Admin Panel**: Manage users, activate/deactivate accounts, and view user summaries.
- 🧑‍✈️ **Super Admin Dashboard**: Manage admins and access system-wide statistics.
- 📑 **Paginated Transactions**: Efficient handling of long transaction lists.
- 🎨 **Modern UI**: Built with **Radix UI** and **Tailwind CSS**.
- ⚙️ **Mocked API Calls**: Simulated using `setTimeout` for async behavior.
- 🌐 **Global State Management**: Powered by **Zustand** and `useContext`.

---

## 👤 Login Credentials

| Role         | Email                   | Password   |
|--------------|--------------------------|------------|
| User         | `user@example.com`       | `userpass` |
| Admin        | `admin@example.com`      | `adminpass`|
| Super Admin  | `subAdmin@example.com`   | `superpass`|

The app auto-detects roles based on the email used at login.

---

## 🛠️ Stack & Libraries

- ⚛️ **React** with **TypeScript**
- ⚡ **Vite** as the build tool
- 📦 **Zustand** for global state (auth, dashboard, users)
- 🔗 `useContext` for theme/auth integration
- 🧱 **Radix UI** for accessible components
- 🎨 **Tailwind CSS** for styling
- 📡 Mocked services with `setTimeout`

---

## 🧠 Zustand Usage

Zustand is used to manage:

- Role-based authentication
- Wallet and transaction data
- Admin/Super Admin actions

**Example Store (appStore.ts):**

```ts
import { create } from 'zustand';

export const useAppStore = create((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  users: [],
  toggleUser: (id) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, active: !u.active } : u
      ),
    })),
}));
Access across components using:

const { role, setRole } = useAppStore();
📁 Folder Structure

src/
├── assets/         # Static files (images/icons)
├── components/     # Shared & page-specific components
├── contexts/       # Context providers (Theme, Auth)
├── hooks/          # Custom reusable hooks
├── lib/            # Utilities and helper functions
├── pages/          # Route-based page components
├── store/          # Zustand state management
├── styles/         # Global and component-level styles
├── types/          # TypeScript interfaces & types
🚀 Getting Started

## 1. Clone the repository
git clone git@github.com:1-aminadab/chapa-frontend-interview-assignment.git
cd chapa-role-dash

## Install dependencies

yarn
## 3. Start development server
yarn dev
Visit the app at: http://localhost:8081

📄 Notes
All data is mocked using setTimeout.

No backend or database required.

Built with scalability, accessibility, and developer experience in mind.