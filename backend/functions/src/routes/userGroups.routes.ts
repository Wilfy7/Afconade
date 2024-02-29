import { Router } from "express";
import { 
    addGroupMember, 
    createUserGroup, 
    getAllUserGroups 
} from "../controllers/userGroups.controllers";


const userGroupsRouter = Router();

userGroupsRouter.post("/user-groups", createUserGroup);

userGroupsRouter.get("/user-groups", getAllUserGroups),

userGroupsRouter.put("/user-groups/:groupid/add-member", addGroupMember)

export default userGroupsRouter;