import Jwt from "jsonwebtoken"
import User from "../models/User.model.js"

let isAuthanticate = async (req, res, next) => {
  let  token  = req.cookies.token
  console.log(token)
  if (!token) {
    return res.json({
      succsess: false,
      message: "please login"
    })
  }

  let deCode = Jwt.verify(token, "@1201877897");
  console.log(deCode)
  next()
}

export default isAuthanticate