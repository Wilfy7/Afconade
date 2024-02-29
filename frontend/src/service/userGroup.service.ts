import axios from "axios";
import { set } from "date-fns";

const baseUrl = process.env.REACT_APP_API;

interface UserGroup {
    name: string;
    isAdminName: string;
    league: string;
}

// create userGroup
export const createUserGroup = async (
    userGroup: UserGroup,
    toast: any,
    navigate: any
    ) => {
    try {
      const res = await axios.post(`${baseUrl}/user-groups`, userGroup); 
      toast("UserGroup created successfully", {
        type: "success"
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);

      return res.data;

    } catch (error: any) {
      toast(error.response.data.message, {
        type: error
      });
      return error;  
    }
};

//Get all userGroups
export const getUserGroups = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user-groups`);
      return res.data;  
    } catch (error) {
      return error;  
    }
};

//Add a member to a user group
export const addUserGroupMember = async (
    userGroup: string,
    name: string,
    toast: any
    ) => {
    try {
      const res = await axios.post(`${baseUrl}/user-groups/add-member`,
       name);  
       toast("User added succefully", {
        type: "success"
       });
       return res.data;
    } catch (error: any) {
      toast(error.response.data.message, {
        type: "error"
      });
      return error;  
    }
};