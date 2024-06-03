import {jwtDecode} from "jwt-decode";

/**
 * Get the value of a cookie by name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} - The cookie value or null if not found.
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

/**
 * Extract and decode the access token from cookies.
 * @returns {object|null} - The decoded token or null if the token is not found.
 */
const extractAndDecodeToken = () => {
  const token = getCookie("access_token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }
  return null;
};

export const removeToken = () => {
    document.cookie = 'access_token=; Max-Age=0; Path=/;';
  };

export default extractAndDecodeToken;
