import { User } from './models.js';

const USERS_KEY = 'store_users';
const CURRENT_KEY = 'store_current_user';

export const auth = {
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch { return []; }
  },

  saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(CURRENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  register(email, password, name = '') {
    email = email.trim().toLowerCase();
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('A user with this email already exists');
    }
    const user = new User(email, password, name);
    users.push(user);
    this.saveUsers(users);
    this.setCurrentUser(user);
    return user;
  },

  login(email, password) {
    email = email.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    this.setCurrentUser(user);
    return user;
  },

  logout() {
    localStorage.removeItem(CURRENT_KEY);
  },

  setCurrentUser(user) {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  },

  isLoggedIn() {
    return !!this.getCurrentUser();
  }
};
