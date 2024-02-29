import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

interface User {
    name: string;
    email: string;
}

//Create a user
export const createUser = async (user: User, toast: any) => {
    try {
      const res = await axios.post(`${baseUrl}/users`, user);
      toast("User created successfully", {
        type: "success"
      }); 
      return res.data; 
    } catch (error: any) {
      toast(error.response.message.data, {
        type: "error"
      }); 
      return error; 
    }
};

//Get all users
export const getAllUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users`);
      return res.data;  
    } catch (error) {
      return error;  
    }
};

//Get a single user
export const getUser = async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/users/${id}`); 
      return res.data; 
    } catch (error) {
      return error;  
    }
};