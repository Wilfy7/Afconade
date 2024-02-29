import axios from "axios";

//Interface for the match
interface IMatch {
    homeTeam: string;
    awayTeam: string;
    matchDate: string;
    matchTime: string;
    matchVenue: string;
}

const baseUrl = process.env.REACT_APP_API;

//Create a match
export const createMatch = async (match: IMatch, toast:any) => {
    try {
      const res = await axios.post(`${baseUrl}/matches`, match);
      
      toast("Match created successfully", {
        type: "success",
      });
      return res.data;
    } catch (error: any) {
      toast(error.response.data.message, {
        type: "error",
      });
      return error  
    }
};

//Get all matches
export const getAllMatches = async () => {
  try {
    const res = await axios.get(`${baseUrl}/matches`);
    return res.data;
  } catch (error) {
    return error;
  }  
};

//Get a single match
export const getSingleMatch = async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/matches/${id}`);  
      return res.data.data;
    } catch (error) {
      return error;  
    }
};

//Update a match
export const upDateMatch = async (id: string, match:IMatch, toast: any) => {
   try {
    
    const res = await axios.put(`${baseUrl}/matches/${id}`, match);
    toast("Match updated successfully", {
        type: "success",
    });
    return res.data;

   } catch (error: any) {
     toast(error.response.data.message, {
        type: "error",
     });
     return error;
   }
};

//Live matches
export const liveMatches = async () => {
    try {
      const res = await axios.get(`${baseUrl}/matches/live/all`);
      
      //Save the live matches in the local storage
      localStorage.setItem("livescore", JSON.stringify(res.data.data));
      return res.data;
    } catch (error) {
      return error  
    }
};