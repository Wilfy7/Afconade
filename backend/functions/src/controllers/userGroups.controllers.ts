
import { Request, Response } from "express";
import UserGroup from "../models/userGroups.model";

//Creating user group
export const createUserGroup = async (req: Request, res:Response ) => {
    try {
        //Get the user group details from the request body
        const userGroup = req.body;

        //Check if user group details are complete
        if (!userGroup.name || !userGroup.league) {
        return res.status(400).json({
        message: "name and league are requiered"
     });
    }

    //Check if the userGroup exist
    const existingUserGroup = await UserGroup.findOne({name: userGroup.name})

    if (existingUserGroup) {
        return res.status(400).json({
            message: "User group already exist"
        });
    }
    //Create a new user group
    const newUserGroup = new UserGroup(userGroup);

    const savedUserGroup = await newUserGroup.save();

    return res.status(201).json({
        message: "User group created successfully",
        data: savedUserGroup
    });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      }); 
    }
};

//Get all user groups
export const getAllUserGroups = async(req: Request, res: Response) => {
   try {
     const userGroups = await UserGroup.find({}).populate("members", "name");

     return res.status(200).json({
        message: "User groups retrieved successsfully",
        data: userGroups
     });
   } catch (error) {
     return res.status(500).json({
     message: "Server Error"
     });
    }   
};

//Add a member to a user group
export const addGroupMember = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const { groupid } = req.params;
      
      //Check if the userGroup exist
      const existingUserGroup = await UserGroup.findOne({_id: groupid});

      if (!existingUserGroup) {
        return res.status(404).json({
            message: "User Group not found"
        });
      }

      //Check if the member exist
      const existingMember = await UserGroup.findOne({ name });

      if (existingMember) {
        return res.status(404).json({
            message: "Member already exist"
        });
      }

      //Add the member to the user group
      const updatedUserGroup = await UserGroup.findByIdAndUpdate(
        groupid,
        { $push: {members: name } },
        { new: true}
      );

      return res.status(200).json({
        message: "User group retrieved successfully",
        data: updatedUserGroup
      })
    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });   
    }
};