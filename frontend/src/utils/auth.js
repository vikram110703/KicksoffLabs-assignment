import { jwtDecode } from 'jwt-decode';
 

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token); 
    return decoded.exp * 1000 > Date.now(); // Check if the token is not expired
  } catch (error) {
    return false; // Invalid token
  }
};

export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token); // Return decoded user info (e.g., id, email)
  } catch (error) {
    return null;
  }
};
