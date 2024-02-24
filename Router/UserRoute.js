import  express  from "express";
import {UserLogin,UserRgister,UserLogout,getProfile} from "../controller/userCont.js";
import isAuthanticate from "../middleware/auth.js";

let userRouter=express();

userRouter.post("/Register",UserRgister);
userRouter.post("/login",UserLogin);
userRouter.get("/logout",UserLogout);
userRouter.get("/getMyprofile",isAuthanticate,getProfile);

export default userRouter