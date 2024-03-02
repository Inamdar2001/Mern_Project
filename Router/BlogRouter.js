import express from "express";
import isAuthanticate from "../middleware/auth.js";
import {createBlog,getBlog,updateBlog,delateBlog,getAllBlog,getblogByid} from "../controller/blogCont.js"
let blogRouter = express();

blogRouter.get("/getBlog", isAuthanticate, getBlog);
blogRouter.put("/updateBlog/:id", isAuthanticate, updateBlog);
blogRouter.post("/createBlog",isAuthanticate, createBlog);
blogRouter.delete("/delateBlog/:id", isAuthanticate, delateBlog);
blogRouter.get("/getAllBlog",getAllBlog)
blogRouter.get("/getblogByid/:id",getblogByid)
export default blogRouter;