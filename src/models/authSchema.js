const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const registerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already present"],
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid Email");
          }
        },
      },
      password: {
        type: String,
        required: true,
      },
      role: { type: String, default: 'user' },
})
registerSchema.methods.generateAuthToken = async function () {
  try {
    console.log('toke data',this._id);
    // const token = jwt.sign(
    //   { _id: this._id.toString() },
    //   process.env.registerData,
    //   {
    //     expiresIn: 3600,
    //   }
    // );
    const token = jwt.sign(
        { _id: this._id.toString(),role:this.role },
        'registersData',
        {
          expiresIn: 3600,
        }
      );
    return token;
  } catch (e) {
    res.status(400).send({ mssg: "token does not exist" });
  }
};
registerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the current pass is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the new  pass is ${this.password}`);
  }
  next();
});
const registerUser = new mongoose.model("registerBackend", registerSchema);
// const registerUser = new mongoose.model("ApnaPanUserDatas", authSchema);
module.exports = registerUser;