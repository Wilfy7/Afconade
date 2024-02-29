import { Request, Response } from "express";
import Match from "../models/match.model";
import Prediction from "../models/prediction.model";
import devApp from "../config/index.config";
import axios from "axios";




export const createMatch = async (req: Request, res: Response) => {
    try {
        //Get the match details from the request body
        const match = req.body

        //Check if match details are complete
        if (!match.homeTeam || !match.awayTeam) {
            return res.status(400).json({
                message: "Home team, away team are required"
            });
        }

        //Check if match exist
        const matchExists = await Match.findOne({
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam
        });
        if (matchExists) {
            return res.status(200).json({
                message: "Match already exist"
            });
        }

        //Create the Match
        const newMatch = new Match({
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            matchDate: match.matchDate,
            matchTime: match.matchTime,
            matchVenue: match.matchVenue
        });

        const savedMatch = await newMatch.save();

        return res.status(200).json({
            message: "Match created successfully",
            data: savedMatch
        });

    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      })
    }
};

//Get all matches
export const getMatches = async (req: Request, res: Response) => {
    try {
        //Get all matches but fetch the latest match first
        const matches = await Match.find({}).sort({createdAt: -1})

        return res.status(200).json({
            message: "Matches fetched successfully",
            data: matches
        });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });  
    }
};

//Get a single match
export const getSingleMatch = async (req: Request, res: Response) => {
    try {
        //Get the match id from the request params
        const matchId = req.params.id;
       

        //Get the match
        const match = await Match.findById(matchId);

        return res.status(200).json({
            message: "Match fetched successfully",
            data: match
        });
        
    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });  
    }
};

//Update a match
export const updateMatch = async(req: Request, res: Response) => {
    try {
       // Get the match id from the request params
       const matchId = req.params.id;
       
       //Get the match details from the request body
       const match = req.body;

       //Check if match exist
       const matchExists = await Match.findById(matchId);
       if (!matchExists) {
        return res.status(404).json({
            message: "Match not found"
        });
       }

       const updatedMatch = await Match.findByIdAndUpdate(matchId, match, {
        new: true
       });

       //Find all predictions that matched the updated match
       const predictions = await Prediction.find({match: matchId});

       //Find the match score for the updated match
       const matchScore = await Match.findById(matchId);

       const matchhomeScore: any = matchScore?.homeScore;

       const matchawayScore: any = matchScore?.awayScore;

       //Compare the predictions with the match score
       const comparedpredictions = predictions.map((prediction: any) =>{
         const isPredictionCorrect =
          prediction.homeScore === matchhomeScore &&
          prediction.awayScore === matchawayScore;

         //If the away team wins with higher score as compare to the home team
         const isPredictionWinnerHome = 
             prediction.homeScore > prediction.awayScore &&
             matchhomeScore > matchawayScore;

         //If the away team wins with higher score
         const isPredictionWinnerAway =
            prediction.awayScore < prediction.homeScore
            matchawayScore < matchhomeScore;    

         //If the match ends in a draw result
         const isPredictionDraw =
            prediction.homeScore === prediction.awayScore &&
            matchhomeScore === matchawayScore;
            
         //If the prediction is correct
         if(isPredictionCorrect) {
            prediction.pointsEarned = 3;
         } else if(isPredictionWinnerHome || isPredictionWinnerAway) {
            prediction.pointsEarned = 1;
         } else if(isPredictionDraw) {
            prediction.pointsEarned = 1;
         } else {
            //Update no points for incorrect prediction
            prediction.pointsEarned = 0;
         }

         return prediction;
       });

       //Save the predictions to the database
       await Promise.all(
        comparedpredictions.map(async (prediction) => {
            await prediction.save()
        })
       );

       return res.status(200).json({
        message: "Match updated successfully",
        data: updatedMatch
       });

    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });  
    }
};

//Live matches
export const getLiveMatches = async (req: Request, res: Response) => {
    try {
        //Get all matches but fetchin the latest first
        const options = {
            method: "GET",
            url: `${devApp.dev.matchesapi.uri}`,
            params: {live: "all"},
            headers: {
                "X-RapidAPI-Key": `${devApp.dev.matchesapi.apiKey}`,
                "X-RapidAPI-Host": `${devApp.dev.matchesapi.apiHost}`
            },
        };
        const fetchMatches = await axios.request(options);

        //Filter through the matches to find the one with CAF
        const matches = fetchMatches.data?.response?.filter(
            (match: {league: {name: string}}) => 
            match.league.name === "Africa Cup of Nations"
            );  
            return res.status(200).json({
                message: "Matches fetched successfully",
                data: matches
            })

    } catch (error) {
      return res.status(500).json({
        message: "Server Error"
      });  
    }
};