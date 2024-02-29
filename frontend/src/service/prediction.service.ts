import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

//Create a prediction
export const createPrediction = async (
    prediction: any,
    toast: any,
    id: string
    ) => {
  try {
    const res = await axios.post(`${baseUrl}/prediction/${id}`, prediction);

    toast("Prediction created successfully", {
        type: "success"
    });
    return res.data;

  } catch (error: any) {
    toast(error.response.data.message, {
        type: error
    });
    return error;
  }  
};

//Get all predictions
export const getAllPredictions = async (toast: any) => {
    try {
      const res = await axios.get(`${baseUrl}/prediction`);
      return res.data;

    } catch (error: any) {
      toast(error.response.data.message, {
        type: "error",
      }); 
      return error; 
    }
};

//Get a prediction by id
export const getPredictionById = async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/prediction/${id}`);
      return res.data;
    } catch (error) {
      return error;  
    }
};

//Update a prediction by id
export const updatePrediction = async (
    prediction: any,
    toast: any,
    id: string
) => {
    try {
      const res = await axios.put(`${baseUrl}/prediction/${id}`, prediction);
      toast("Prediction updated successfully", {
        type: "success"
      });
      return res.data;
        
    } catch (error: any) {
      toast(error.response.data.message, {
        type: error
      }); 
      return error; 
    }
};