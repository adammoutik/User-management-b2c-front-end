// users.service.js

import axios from "axios";
import { getCookie } from "./auth.service";

const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

export const getUsers = async (query = '') => {
  const response = await fetch(`${API_URL}/user/?${query}`,{
    method: 'GET',
    credentials: 'include', // Include cookies with the request
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const resetPassword = async (email) => {
  const response = await fetch(`${API_URL}/user/reset-password/${email}`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to reset password');
  }
  return await response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
};



export const createUser = async (userData) => {
  try {
    const token = getCookie("access_token");
    const password = generateRandomPassword();
    userData = { ...userData, password }; // Add generated password to user data
    const response = await axios.post(`${API_URL}/user/new`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.data;
    const createdUser = responseData.user; // Assuming the response contains user data
    return { ...responseData, password }; // Return generated password along with other response data
  } catch (error) {
    let errorMessage = "Error adding User: ";
    errorMessage += error.message;
    alert(errorMessage);
    throw new Error(errorMessage);
  }
};
export const updateUser = async (id, userData) => {
  try {
      const token = getCookie("access_token");
      const response = await axios.patch(`${API_URL}/user/${id}`, userData, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });
      
      
          const resData = await response.data;
          return resData;
     
        
  } catch (error) {
      let errorMessage = 'Error updating User: ';
      
      
          errorMessage += error.message;
      

      alert(errorMessage);
      throw new Error(errorMessage);
  }
};



 export function generateRandomPassword(length = 16) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}