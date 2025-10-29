// Authentication and Storage Utilities

const SESSION_KEY = 'ticketapp_session';
const TICKETS_KEY = 'ticketapp_tickets';
const USERS_KEY = 'ticketapp_users';

// Mock users database
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const mockUsers = [
      { email: 'admin@ticketapp.com', password: 'admin123', name: 'Admin User' },
      { email: 'user@test.com', password: 'password123', name: 'Test User' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  }
};

// Initialize app data
export const initializeApp = () => {
  initializeUsers();
  if (!localStorage.getItem(TICKETS_KEY)) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify([]));
  }
};

// Auth functions
export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const session = {
      email: user.email,
      name: user.name,
      token: btoa(email + Date.now()),
      timestamp: Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  }
  return { success: false, error: 'Invalid email or password' };
};

export const signup = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already exists' };
  }
  
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return login(email, password);
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const isAuthenticated = () => {
  return getSession() !== null;
};

// Ticket CRUD operations
export const getTickets = () => {
  const tickets = localStorage.getItem(TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

export const getTicketById = (id) => {
  const tickets = getTickets();
  return tickets.find(t => t.id === id);
};

export const createTicket = (ticketData) => {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now().toString(),
    ...ticketData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tickets.push(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return { success: true, ticket: newTicket };
};

export const updateTicket = (id, ticketData) => {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);
  
  if (index === -1) {
    return { success: false, error: 'Ticket not found' };
  }
  
  tickets[index] = {
    ...tickets[index],
    ...ticketData,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return { success: true, ticket: tickets[index] };
};

export const deleteTicket = (id) => {
  const tickets = getTickets();
  const filteredTickets = tickets.filter(t => t.id !== id);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(filteredTickets));
  return { success: true };
};

// Validation
export const validateTicket = (data) => {
  const errors = {};
  
  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  }
  
  if (!data.status) {
    errors.status = 'Status is required';
  } else if (!['open', 'in_progress', 'closed'].includes(data.status)) {
    errors.status = 'Status must be: open, in_progress, or closed';
  }
  
  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAuth = (data, isSignup = false) => {
  const errors = {};
  
  if (isSignup && (!data.name || data.name.trim().length === 0)) {
    errors.name = 'Name is required';
  }
  
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Statistics
export const getTicketStats = () => {
  const tickets = getTickets();
  return {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };
};
