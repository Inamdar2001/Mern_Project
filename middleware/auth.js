import Jwt from "jsonwebtoken"
import User from "../models/User.model.js"

let isAuthanticate = async (req, res, next) => {
  let token = req.cookies.token
  console.log("user token", token)
  if (!token) {
    return res.json({
      succsess: false,
      message: "please login"
    })
  }

  let deCode = Jwt.verify(token, "@1201877897");
  req.user = await User.findById(deCode._id)
  console.log("check save ya not ", req.user)
  next()
}

export default isAuthanticate