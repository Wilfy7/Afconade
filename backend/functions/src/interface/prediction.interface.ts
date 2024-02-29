import mongoose from "mongoose";


export interface IPrediction extends mongoose.Document{
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
};