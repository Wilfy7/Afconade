import express from "express";
import * as functions from "firebase-functions";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB";
import predictionRouter from "./routes/prediction.routes";
import matchRouter from "./routes/match.routes";
import userRouter from "./routes/user.routes";
import userGroupsRouter from "./routes/userGroups.routes";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(cors());

//routes for the server
app.get("/", (req: express.Request, res: express.Response) => {
    try {

        return res.status(200).json({
            message: "Welcome to the AFCON games API"
        });  
    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });
    };
});

app.use("/api/v1", userRouter); //user routes
app.use("/api/v1", matchRouter); //match routes
app.use("/api/v1", predictionRouter); //prediction routes
app.use("/api/v1", userGroupsRouter); //userGroup routes

connectDB();

//Handle unknown routes (404 Not Found)
app.use((req: express.Request, res: express.Response) => {
    return res.status(400).json({
        message: "Page not found"
    });
});


export const AfconadeApi = functions.https.onRequest(app);
