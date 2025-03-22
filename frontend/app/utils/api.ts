import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Change if using a real server

export const loginUser = async (member_id: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { member_id, password });
    return response.data;
  } 
  catch (error){
    throw error;
  }
};
