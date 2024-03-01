import Jwt from "jsonwebtoken"

let isAuthanticate = async (req, res, next) => {
  let { token } = req.cookies
  if (!token) {
    return res.json({
      succsess: false,
      message: "please login"
    })
  }

  let deCode = Jwt.verify(token, process.env.JWT_SECRET_KEY);
  next()
}

export default isAuthanticate