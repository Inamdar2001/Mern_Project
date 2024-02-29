import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt';




// User Rgister
let UserRgister = async (req, res) => {

   try {
      let { password, name, email } = req.body
      console.log(name, "name")
      const hashPassword = await bcrypt.hash(password, 10)

      if(userExit){
         return res.json({
            success:false,
            message:"user already exit"
      })
      }
      let user = new User({ password: hashPassword, name, email });
      let userExit = await User.findOne({ name })

      
      await user.save();
      console.log(user)

       
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      console.log(token)

      return res.status(201).cookie("token", token).json({
         success: true,
         message: "User Register successfully",
         user
      })
   } catch (error) {
      console.error("Error occurred ", error);
      return res.status(500).send({ success: false, message: "Internal server error." });
   }

}



// User Login
let UserLogin = async (req, res) => {

   try {
      let { email } = req.body;
      console.log(req.body)
      let user = await User.findOne({ email })

      if (!user) {
         return res.json({
            success: false,
            message: "user not exit"
         })
      }


      const isMatch = await bcrypt.compare(req.body.password, user.password)
      if (!isMatch) {
         return res.json({
            success: false,
            message: "Invalid credential"
         })
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      return res.status(201).cookie("token", token).json({
         success: true,
         message: "login successfully"
      })


   } catch (error) {
      console.error("Error occurred LOgin", error);
      return res.status(500).send({ success: false, message: "Internal server error." });
   }

}


// User get Profile
let getProfile = (req, res) => {

   res.status(201).json({
      success: true,
      user: req.user

   })
}

//  User Logout



let UserLogout = (req, res) => {
   res.status(200).cookie("token", "", {
      expires: new Date(Date.now())
   }).json({
      success: true,
      message: "logout successfully"
   })
}

 let getuserByid = async (req, res) => {

   try {
      let id = req.params.id
      let user = await User.findById({ _id: id });
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "invalid id"
         })
      }
      res.json(user)
   } catch (error) {
      console.log(error)
   }
}
export { UserRgister, UserLogin, getProfile, UserLogout,getuserByid } 