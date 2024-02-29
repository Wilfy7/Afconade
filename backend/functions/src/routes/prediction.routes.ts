import { Router } from "express";
import { 
    createMatchPrediction, 
    getAllPredictions, 
    getPredictionById, 
    updatePrediction 
} from "../controllers/prediction.controllers";


const predictionRouter = Router();

//create a prediction
predictionRouter.post("/prediction/:matchid", createMatchPrediction);

//Get all predictions
predictionRouter.get("/prediction", getAllPredictions);

//Get a prediction by id
predictionRouter.get("/prediction/:id", getPredictionById);

//Update prediction
predictionRouter.put("/prediction/:id", updatePrediction)


export default predictionRouter;