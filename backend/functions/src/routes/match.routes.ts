import { Router } from "express";
import { createMatch, getLiveMatches, getMatches, getSingleMatch, updateMatch } from "../controllers/match.controllers";

const matchRouter = Router();

//Create match router
matchRouter.post("/matches", createMatch);

//Get all matches
matchRouter.get("/matches", getMatches);

//Get a single match
matchRouter.get("/matches/:id", getSingleMatch);

//Update a match 
matchRouter.put("/matches/:id", updateMatch);

//Live Matches route
matchRouter.get("/matches/live/all", getLiveMatches)


export default matchRouter;