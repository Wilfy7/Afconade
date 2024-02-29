import mongoose from "mongoose";
import { IuserGroup } from "../interface/userGroups.interface";


const userGroupsSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    members: [
        {
          type: String,
          unique: true,
        },
    ],
    league: {
        type: String,
        required: true,
    },
    isAdminName: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
 );

 const UserGroup = mongoose.model<IuserGroup>("UserGroup", userGroupsSchema);
 export default UserGroup;