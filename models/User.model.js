import mongoose from "mongoose";


let Userscehma=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    createdAt:{
        type:Date,
        default:Date.now
    }
    
    
})

let User=new mongoose.model("MERN_DATA",Userscehma)

export default User