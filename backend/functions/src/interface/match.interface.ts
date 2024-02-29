import mongoose from "mongoose";


export interface Imatch extends mongoose.Document{
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
};