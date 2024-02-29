import express from "express";
import * as functions from "firebase-functions"
import morgan from "morgan";
import cors from "cors";
import devApp from "./config/index.config";
import chalk from "chalk"
import connectDB from "./config/connectDB";
import userRouter from "./routes/user.routes";
import predictionRouter from "./routes/prediction.routes";
import matchRouter from "./routes/match.routes";
import userGroupsRouter from "./routes/userGroups.routes";


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(cors());

//Port for the server
const port = devApp.dev.port

//route for the server
app.get("/", (req: express.Request, res: express.Response) => {
    try {
        return res.status(200).json({
            message: "Welcome to the AFcon Games API",
        });
    } catch (error) {
      return res.status(500).json({
            message: "Server Error",
        });
    }
});

app.use("/api/v1", userRouter); //user routes
app.use("/api/v1", matchRouter); //match routes
app.use("/api/v1", predictionRouter); //prediction routes
app.use("/api/v1/", userGroupsRouter); //UserGroup routes

//Set up the server
app.listen(port, () => {
  console.log(chalk.yellowBright(`Server running on port http://localhost:${port}`));
});
//Connect the database
connectDB();

// Handle unknown routes (404 Not Found)
app.use((req: express.Request, res: express.Response) => {
    return res.status(404).json({
        message: "Route not found",
    });
});

export const AfconadeApi = functions.https.onRequest(app);