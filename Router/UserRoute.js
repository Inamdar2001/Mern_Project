import  express  from "express";
import {UserLogin,UserRgister,UserLogout,getProfile,getuserByid} from "../controller/userCont.js";
import isAuthanticate from "../middleware/auth.js";

let userRouter=express();

userRouter.post("/Register",isAuthanticate,UserRgister);
userRouter.post("/login",isAuthanticate,UserLogin);
userRouter.get("/logout",UserLogout);
// userRouter.get("/getMyprofile",getProfile);
userRouter.get("/getuserByid/:id",getuserByid)
export default userRouter   