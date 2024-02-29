import{ Document } from "mongoose";

export interface IuserGroup extends Document{
    name: string;
    isAdmin: boolean;
    members: string[];
    league: string;
}