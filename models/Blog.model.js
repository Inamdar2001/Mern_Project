import mongoose from "mongoose";


let Blogscehma=new mongoose.Schema({
    tittle:{type:String,require:true},
    description:{type:String},
    imgURL:{
        type:String,
        require:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
    
    
    
    
    
})

let Blog=new mongoose.model("Blog",Blogscehma)

export default Blog