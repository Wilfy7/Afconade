import { Request, Response } from "express";
import Match from "../models/match.model";
import User from "../models/user.model";
import Prediction from "../models/prediction.model";




export const createMatchPrediction = async (req: Request, res: Response) => {
    try {
        //Get the match details from the request body
        const match = req.body;

       //Get the id of the match from the request params
       const matchId = req.params.matchid; 

       //Check if match details are complete
       if(!match.homeScore || !match.awayScore) {
        return res.status(400).json({
            message: "Please provide a match score"
        });
       }

       //Find The match in the database
       const oneMatch = await Match.findById(matchId);

       //Find the user in the database by name
       const user = await User.findOne({name: match.user });

       const userId = user?._id;

       //Check if user exists
       if(!user) {
        return res.status(404).json({
            message: "User not found",
        });
       }

       //Check if match exist
       if(!oneMatch) {
        return res.status(404).json({
            message: "Match not found"
        });
       }

       //Find one prediction for the match 
       const onePrediction = await Prediction.findOne({
        match: matchId,
        user: userId,
    });

    //Check if prediction exist
    if(onePrediction) {
        return res.status(400).json({
            message: "Prediction already made for this match",
        });
    }

    //Create a prediction for the match
    const prediction = await Prediction.create({
        ...match,
        match: matchId,
        user: userId,
    });

    //Save the prediction to the database
    const savedPrediction = await prediction.save();

    return res.status(200).json({
        message: "Prediction created successfully",
        data: savedPrediction,
    });

    } catch (error) {      
      return res.status(500).json({
        message: "Server Error"
      });  
    }
};

//Get all predictions
export const getAllPredictions = async (req: Request, res: Response) => {
    try {
        //Get all predictions from the database
        const predictions = await Prediction.find()
           .populate("user")
           .populate("match")
           .sort({ createdAT: -1 });
        return res.status(200).json({
            message: "Predictions retrieved successfully",
            data: predictions
        });    
    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });  
     }
   } 

//Update a prediction by id
export const updatePrediction = async (req: Request, res: Response) => {
    try {
       //Get the prediction id from the request params
       const predictionId = req.params.id;

       //Get the request details from request body
       const prediction = req.body;

       //Check if the prediction exist
       const existingPrediction = await Prediction.findById(predictionId)
       if(!existingPrediction) {
        return res.status(404).json({
            message: "Prediction not found"
        });
       }

      //Check if prediction details are complete
      if (!prediction.homeScore || !prediction.awayScore) {
        return res.status(400).json({
        message: "Please provide the prediction scores"
     });
    }
    

  //Find the prediction in the datbase
  const onePrediction = await Prediction.findById(predictionId)

  //check if prediction exist
  if(!onePrediction) {
    return res.status(404).json({
        message: "Prediction not found"
    });
  }

  //Update the prediction
  const updatedPrediction = await Prediction.findByIdAndUpdate(
    predictionId,
    prediction,
    {new: true}
  );

  return res.status(200).json({
    message: "Prediction updated successfully",
    data: updatedPrediction
  });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error"
    });  
   }
  };

  //Find a prediction by id
  export const getPredictionById = async (req: Request, res: Response) => {
    try {
        //Get the prediction Id from the params
        const predictionId = req.params.body;

        //Find the prediction in the database
        const prediction = await Prediction.findById(predictionId)
        .populate("user")
        .populate("match");

        //Check if prediction exist
        if (!prediction) {
            return res.status(404).json({
             message: "Prediction not found"
            });
        }

        return res.status(200).json({
          message: "Prediction retrieved successfully",
          data: prediction
        });

    } catch (error) {
      return res.status(500).json({ 
        message: "Server Error"
      });  
    }
  };