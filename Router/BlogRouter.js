import express from "express";
import isAuthanticate from "../middleware/auth.js";
import {createBlog,getBlog,updateBlog,delateBlog} from "../controller/blogCont.js"
let blogRouter = express();

blogRouter.get("/getBlog", isAuthanticate, getBlog);
blogRouter.put("/updateBlog/:id", isAuthanticate, updateBlog);
blogRouter.post("/createBlog", isAuthanticate, createBlog);
blogRouter.delete("/delateBlog/:id", isAuthanticate, delateBlog);


export default blogRouter;