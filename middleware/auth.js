import Jwt from "jsonwebtoken"
import User from "../models/User.model.js"

let isAuthanticate = async (req, res, next) => {
  let  {token } = req.cookies
  console.log("from auth",token)
  if (!token) {
    return res.json({
      succsess: false,
      message: "please login"
    })
  }

  let deCode = Jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = deCode;
  console.log("decode",deCode)

  next();

}

export default isAuthanticate