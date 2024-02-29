import { Router } from "express";
import { 
    createUser, 
    getAllUsers, 
    getUserWithPredictions 
} from "../controllers/user.controllers";


const userRouter = Router();

//Create a user 
userRouter.post("/users", createUser);

//Get all users
userRouter.get("/users", getAllUsers)

//Get a user with all his/his predictions
userRouter.get("/users/:id", getUserWithPredictions);




export default userRouter;