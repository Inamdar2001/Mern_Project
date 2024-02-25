
import Blog from "../models/Blog.model.js";
import params from "params";




export let getBlog = async (req, res) => {
  let userid = req.user._id
  let blogs = await Blog.find({ user: userid })
  res.json(blogs)
}


export let createBlog = async (req, res) => {

  try {
    let { tittle, description, imgURL } = req.body;

    let blog = await Blog.create({ tittle, description, imgURL, user: req.user })
    res.json(blog)

  } catch (error) {
    console.log("error occured", error)
  }
}

export let updateBlog = async (req, res) => {


  try {
    let { tittle, description, imgURL } = req.body;

    let id = req.params.id
    let blog = await Blog.findById({ _id: id });
    if(!blog){
      return res.status(404).json({
        success:false,
        message:"invalid id"

      })
    }
    blog.tittle = tittle;
    blog.description = description;
    blog.imgURL = imgURL;
    await blog.save()
    console.log(blog)
    res.json(blog)
  } catch (error) {
    console.log("error occured", error)
  }
}

export let delateBlog= async(req,res)=>{
  let id = req.params.id
    let blog = await Blog.findById({ _id: id });
    if(!blog){
      return res.status(404).json({
        success:false,
        message:"invalid id"


      })
    }
     await blog.deleteOne()

     return res.json({
      success:true,
      message:"blog deleted successfully"

    })
  }
export let getAllBlog= async(req,res)=>{
  let blog=await Blog.find()
  res.json(blog)
}

export let getblogByid=async(req,res)=>{
  let id = req.params.id
  let blog = await Blog.findById({ _id: id });
  res.json(blog)
}