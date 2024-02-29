import { Request, Response } from "express"
import User from "../models/user.model";
import Prediction from "../models/prediction.model";




export const createUser = async (req: Request, res: Response) => {
    try {
        //get the data from the request body
        const user = req.body;
        
        //Check if user details are complete
        if(!user.name) {
            return res.status(400).json({
                message: "name is required"
            });
        }

        //Check if the user already exist
        const existingUser = await User.findOne({name: user.name});

        if(existingUser) {
            return res.status(200).json({
                message: "User already exist"
            });
        }

        //Create new user 
        const newUser = new User(user);

        const savedUser = await newUser.save();

        return res.status(200).json({
            message: "New user created successfully",
            data: savedUser
        });

    } catch (error) {
      console.log(error)
      return res.status(500).json({
      message:"Server error" 
      }) ; 
    }
};


//Get all users with total point
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        //Get all users
        const users = await User.find();

//map through each user to get their predictions and calculate total point
const usersWithPoints = await Promise.all(
    users.map(async (user) => {
    //Get all prediction made by the user
    const predictions = await Prediction.find({user: user._id});

    //Sum up the pointsEarned for all predictions
    const totalPoints = predictions.reduce(
        (acc, prediction: any) => acc + prediction.pointsEarned,
        0
    );

    //Create a new object with user details and total points
    return {
        _id: user._id,
        name: user.name,
        Points: totalPoints,
    };
    })
  );

  return res.status(200).json({
    message: "Users with total points fetched succesfully",
    data: usersWithPoints,
  });

    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });   
    }
};

//Get a user with all predictions made
export const getUserWithPredictions = async (req: Request, res: Response) => {
    try {
      //Check if user id from the request params
      const { id } = req.params;

      //Check if user exist
      const existingUser = await User.findById(id);
      if(!existingUser) {
        return res.status(404).json({
            message: "User not found"
        });
      }

      //Get all predictions made by user
      const predictions = await Prediction.find({user: id }).populate("match");

      //Sum up the pointsEarned for all predictions
      const totalPoints = predictions.reduce(
        (acc, prediction: any) => acc + prediction.pointsEarned,
        0
      );

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {points: totalPoints},
        {new: true}
      );

      //Send the updatedUser and predictions to the client
      return res.status(500).json({
        message: "User fetched succesfully",
        data: {
            user: updatedUser,
            predictions,
        }, 
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });  
    }
};