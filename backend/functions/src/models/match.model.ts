import mongoose from "mongoose";
import { Imatch } from "../interface/match.interface";


const matchSchema = new mongoose.Schema({
    homeTeam: {
        type: String,
        required: true,
    },
    awayTeam: {
        type: String,
        required: true,
    },
    homeScore: {
        type: Number,
        default: 0,
    },
    awayScore: {
        type: Number,
        default: 0,
    },
    matchDate: {type: String},
    matchTime: {type: String},
    matchVenue: {type: String},
},
{
  timestamps: true
}
);

const Match = mongoose.model<Imatch>("Match", matchSchema);
export default Match;