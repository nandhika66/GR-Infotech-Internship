const USERS_KEY = "freelancer_users";
const LOGGED_IN_KEY = "freelancer_logged_in_user";

function getUsers() {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
}

// 🔹 SIGN UP WITH PROFILE
export function signUp(email, password, profile) {
  const users = getUsers();

  if (users[email]) return false;

  users[email] = {
    password,
    profile
  };

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(LOGGED_IN_KEY, email);
  return true;
}

// 🔹 SIGN IN
export function signIn(email, password) {
  const users = getUsers();
  if (!users[email]) return false;
  if (users[email].password !== password) return false;

  localStorage.setItem(LOGGED_IN_KEY, email);
  return true;
}

// 🔹 LOGOUT
export function logout() {
  localStorage.removeItem(LOGGED_IN_KEY);
}

// 🔹 AUTH CHECK
export function isLoggedIn() {
  return !!localStorage.getItem(LOGGED_IN_KEY);
}

// 🔹 CURRENT USER
export function getCurrentUser() {
  const email = localStorage.getItem(LOGGED_IN_KEY);
  return email ? { email } : null;
}

// 🔹 GET PROFILE
export function getProfile() {
  const email = localStorage.getItem(LOGGED_IN_KEY);
  if (!email) return null;

  const users = getUsers();
  return users[email]?.profile || null;
}
