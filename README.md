# Chapa Frontend Interview Assignment

This is a role-based dashboard Single Page Application (SPA) built with React for a fictional Payment Service Provider platform as part of the Chapa Frontend Developer (React) test task.

---

## 📋 Overview

This project simulates a real-world dashboard with role-based access control for three types of users:

1. **User**
2. **Admin**
3. **Super Admin**

The application uses mock data and simulates API calls with tools like `setTimeout`. No real backend is required.

---

## 🚀 Features

### 👤 User Dashboard

- 💰 Displays mock wallet balance
- 📄 Shows a list of recent transactions (hardcoded)
- 💸 Form to initiate a transaction (with fake async feedback)

### 🛠️ Admin Dashboard

- 👥 Displays a mocked list of users
- 🔄 Ability to activate/deactivate users (toggle state)
- 📊 Summary of user payments (table or chart)

### 🧙‍♂️ Super Admin Dashboard

- ✅ Includes all Admin features
- ➕ Form to add/remove Admins (mocked)
- 📈 System-wide stats: total payments, number of active users, etc.

---

## 🛠️ Tech Stack

- **React** (or Next.js)
- **TypeScript**
- **Tailwind CSS** for styling
- **React Context** for global state (or your preferred state manager)
- **Mock API simulation** using:
  - `setTimeout`
  - OR [`Mock Service Worker (MSW)`](https://mswjs.io/)
  - OR `json-server`

---

## 📁 Folder Structure

