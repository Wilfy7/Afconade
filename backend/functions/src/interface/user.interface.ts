import mongoose from "mongoose";


//User interface for the database model
export interface IUser extends mongoose.Document{
    name: string;
    isAdmin: boolean;
};