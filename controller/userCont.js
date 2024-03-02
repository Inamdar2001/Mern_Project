import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt';




// User Rgister
const UserRegister = async (req, res) => {
   try {
      let { password, name, email } = req.body;
      console.log(name, "name");

      const hashPassword = await bcrypt.hash(password, 10);

      let userExists = await User.findOne({ name: name });

      if (userExists) {
         return res.json({
            success: false,
            message: "User already exists"
         });
      }

      let user = new User({ password: hashPassword, name, email });

      await user.save();
      console.log(user);

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      console.log(token);

      return res.status(201).cookie("token", token).json({
         success: true,
         message: "User registered successfully",
         user
      });
   } catch (error) {
      console.error("Error occurred during user registration:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
   }
};




// User Login
let UserLogin = async (req, res) => {

   try {
      let { email } = req.body;
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
         message: "login successfully",
         token: token,
         user: user

      })


   } catch (error) {
      console.error("Error occurred LOgin", error);
      return res.status(500).send({ success: false, message: "Internal server error." });
   }

}


// User get Profile
let getProfile = (req, res) => {
   console.log(req.user)

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
export { UserRegister, UserLogin, getProfile, UserLogout, getuserByid } 