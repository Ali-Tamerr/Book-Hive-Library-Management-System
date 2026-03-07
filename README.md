# BookHive Library - Admin Panel

A modern library management system built with React, Vite, and TailwindCSS.

## 🚀 Features

This application has been converted from static HTML/CSS/JS pages to a fully functional React application with:

- **Authentication Pages**
  - Login
  - Sign Up
  - Forgot Password
  - OTP Verification
  - Reset Password

- **Dashboard**
  - Overview with statistics
  - Visual chart representation
  - Quick access to key information

- **Borrowed Books Management**
  - View all borrowed books
  - Track due dates
  - View book details via popup

- **Overdue Borrowers**
  - List of overdue borrowers
  - Filtering and search capabilities

- **User Management**
  - Add/Edit/Delete users
  - Search functionality
  - User details management

## 🛠️ Technologies

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
book-hive/
├── src/
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BorrowedBooks.jsx
│   │   ├── Overdue.jsx
│   │   └── UserManagement.jsx
│   ├── layouts/         # Layout components
│   │   └── DashboardLayout.jsx
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css       # Global styles
├── public/
│   └── assets/         # Static assets (icons, logo)
└── index.html          # HTML template
```

## 🎨 Design

The application features a modern, clean design with:

- Dark blue color scheme (#000035)
- Poppins font for body text
- Caveat font for "Library" branding
- Responsive layouts
- Smooth transitions and animations

## 🔄 Migration

This project has been converted from static HTML pages to React components:

- All CSS converted to TailwindCSS utility classes
- JavaScript functionality implemented with React hooks
- HTML structure converted to JSX
- Assets properly organized in public folder

## 🚦 Running the App

The development server will start at `http://localhost:5173` (or the next available port).

### Available Routes

- `/login` - Admin login page
- `/signup` - Admin signup page
- `/forgot-password` - Password reset request
- `/otp` - OTP verification
- `/reset-password` - Set new password
- `/dashboard` - Main dashboard
- `/borrowed-books` - Borrowed books list
- `/overdue` - Overdue borrowers list
- `/user-management` - User management interface

## 📝 Notes

- The application uses React Router for navigation
- All styling has been converted to TailwindCSS
- The original design and layout have been preserved
- Assets from the "New Folder" directory have been properly organized
- A placeholder logo has been created as an SVG

## 🔧 Development

To contribute or modify the application:

1. Make sure all dependencies are installed
2. Start the development server with `npm run dev`
3. Edit files in the `src` directory
4. Changes will be automatically reflected in the browser

---

**Converted from HTML/CSS/JS to React + Vite + TailwindCSS** ✨
