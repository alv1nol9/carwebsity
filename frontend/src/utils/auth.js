// src/utils/auth.js

export function isAdmin() {
  // Returns true if a token is present in localStorage (simple check)
  return !!localStorage.getItem('token');
}
