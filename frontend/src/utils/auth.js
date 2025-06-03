// frontend/src/utils/auth.js
export function getTokenPayload() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getTokenPayload();
}

export function isAdmin() {
  const payload = getTokenPayload();
  return payload && payload.isAdmin === true;
}
