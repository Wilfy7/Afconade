import mongoose from "mongoose";
import { IPrediction } from "../interface/prediction.interface";

const predictionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    match: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Match"
    },
    pointsEarned: { 
        type: Number, 
        default: 0
    },
    homeTeam: {
        type: String, 
        require: true
    },
    awayTeam: {
        type: String, 
        require: true
    },
    homeScore: {
        type: Number, 
        default: 0
    },
    awayScore: {
        type: Number, 
        default: 0
    },
},
{
    timestamps: true,
}
);

//prediction model for the database model
const Prediction = mongoose.model<IPrediction>("Prediction", predictionSchema);
export default Prediction;