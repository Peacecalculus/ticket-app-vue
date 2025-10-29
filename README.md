# Ticket Web App - Vue.js Implementation

A full-featured ticket management system built with Vue 3, featuring authentication, CRUD operations, and a modern responsive UI.

## 🚀 Features

- **Landing Page** - Hero section with animated wavy background
- **Authentication System** - Login and Signup with form validation
- **Dashboard** - Overview of ticket statistics
- **Ticket Management** - Full CRUD operations
- **Protected Routes** - Secure access with Vue Router guards
- **Real-time Validation** - Inline error messages and toast notifications
- **Responsive Design** - Mobile-first design with max-width: 1440px
- **LocalStorage Persistence** - Data stored in browser

## 🛠️ Technologies Used

- **Vue 3.3.8** - Progressive JavaScript framework
- **Vue Router 4.2.5** - Official router for Vue.js
- **Composition API** - Modern Vue development approach
- **Vite 5.0.0** - Fast build tool and dev server
- **CSS3** - Custom styling with CSS variables
- **Font Awesome 6.0.0** - Icons
- **LocalStorage API** - Data persistence

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Navigate to the project directory**
   ```bash
   cd ticket-app-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will be available at `http://localhost:5174`

## 📖 Usage Guide

### Test User Credentials

- **Email:** admin@ticketapp.com  
  **Password:** admin123

- **Email:** user@test.com  
  **Password:** password123

### Creating Tickets

1. Log in to your account
2. Navigate to "Manage Tickets"
3. Click "Create New Ticket"
4. Fill in the fields (title required, status required)
5. Click "Create Ticket"

### Managing Tickets

- **View All** - See all tickets in card layout
- **Edit** - Click "Edit" button on any ticket
- **Delete** - Click "Delete" button with confirmation
- **Status Colors** - Green (Open), Amber (In Progress), Gray (Closed)

## 🎨 Design Features

### Layout Specifications

- **Max Width:** 1440px (centered on large screens)
- **Hero Section:** Animated SVG wave background
- **Decorative Elements:** Floating circles
- **Card Design:** Box shadows and rounded corners

### Status Colors
- **Open:** Green (#2ecc71)
- **In Progress:** Amber (#f39c12)
- **Closed:** Gray (#95a5a6)

## 🔒 Security & Authentication

### Session Management
- Sessions stored in `localStorage` with key: `ticketapp_session`
- Protected routes redirect unauthorized users to `/auth`

### Data Validation
- **Title:** Required
- **Status:** Required (open/in_progress/closed only)
- **Description:** Optional, max 500 characters

## 📁 Project Structure

```
ticket-app-vue/
├── public/              # Static assets
├── src/
│   ├── assets/          # CSS and images
│   │   └── App.css
│   ├── components/      # Reusable components
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── Toast.vue
│   ├── views/           # Page components
│   │   ├── Landing.vue
│   │   ├── Auth.vue
│   │   ├── Dashboard.vue
│   │   └── Tickets.vue
│   ├── router/          # Vue Router config
│   │   └── index.js
│   ├── utils/           # Helper functions
│   │   └── helpers.js
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── README.md            # This file
```

## 🔄 State Management

- **Component State** - Using Vue's reactive data
- **LocalStorage** - Persistent storage for sessions, tickets, users

## ⚠️ Error Handling

1. **Validation Errors** - Inline messages beneath fields
2. **Authentication Errors** - Toast notifications
3. **Authorization Errors** - Automatic redirect to login
4. **Data Errors** - Graceful error messages

## 🌐 Routing Structure

- `/` - Landing page (public)
- `/auth` - Login/Signup (public, redirects if authenticated)
- `/dashboard` - Dashboard (protected)
- `/tickets` - Ticket management (protected)

## 🎯 Accessibility Features

- Semantic HTML elements
- Keyboard navigation support
- Focus states on interactive elements
- Sufficient color contrast
- ARIA labels where needed

## 📦 Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Output in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🐛 Known Issues

- LocalStorage data persists across sessions
- No server-side validation
- No pagination for large ticket lists

## 📝 Notes

- Frontend-only implementation
- Mock authentication with localStorage
- No backend server required
- Data persists in browser storage

## 👤 Author

Built for HNG12 Frontend Stage 2 Task - Vue.js Implementation

---

**Last Updated:** October 2025
# ticket-app-vue
# ticket-app-vue
