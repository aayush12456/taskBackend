const bcrypt=require('bcrypt')
const mongoose = require('mongoose');
const authUser=require('../models/authSchema')
exports.register=async(req,res)=>{
try{
       const UserData = new authUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user'
        });
        const finalUserData=await  UserData.save()
        console.log('final user data is',finalUserData)
        res.status(200).send({
            mssg:'data register successfully',
            user:finalUserData
        })
}catch(e){
console.log('error is',e)
res.status(500).send({
    err:e
})
}
}
exports.login = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      const userEmail = await authUser.findOne({ email: email });
  
      if (!userEmail) {
        res.status(400).send({ mssg: "Email does not exist", response: 400 });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, userEmail.password);
      console.log('password login data', isMatch);
  
      if (isMatch) {
        const token = await userEmail.generateAuthToken();
        console.log('login token is', token);
  
        res.status(201).send({
          mssg: 'Login Successfully',
          response: 201,
          token: token,
          name:userEmail.name,
          role:userEmail.role
        });
      } else {
        res.status(400).send({ mssg: "Wrong password", response: 400 });
      }
    } catch (e) {
      res.status(400).send({ mssg: "Wrong login details. Please try again.", response: 400 });
    }
  };

  exports.getAdminUser=async(req,res)=>{
try{
const allUser=await authUser.find()
const userAdmin=allUser.filter((item)=>item.role==='admin')
console.log('user admin is',userAdmin)
res.status(200).send({mssg:'data fetch success',user:userAdmin})
}catch(e){
  res.status(400).send({ mssg: "Wrong login details. Please try again.", response: 400 });
}
  }