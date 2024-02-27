import express from "express";
import dotenv from "dotenv";
import Connect from "./DB/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./Router/UserRoute.js";
import blogRouter from "./Router/BlogRouter.js";
import cors from "cors";
const app =express()
dotenv.config()

const port=process.env.PORT||8000

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
Connect(process.env.URL,process.env.DBNAME)

app.use("/user",userRouter);
app.use("/blog",blogRouter)
app.listen(port,()=>{
    console.log(`Server started at this ${port}`)
})



