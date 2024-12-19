// authMiddleware.js
const jwt = require("jsonwebtoken");
const authUser = require("./models/authSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "registerData"); // Use the same secret key as in `generateAuthToken`
    const user = await authUser.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ mssg: "Authentication failed", response: 401 });
  }
};

module.exports = authenticate;
