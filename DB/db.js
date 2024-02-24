
import mongoose from "mongoose";

let Connect=(dburl,dbname)=>{
   mongoose.connect(dburl+dbname);
   let db=mongoose.connection
   db.on("open",()=>{
    console.log("data base created successfully")
   })
}

export default Connect