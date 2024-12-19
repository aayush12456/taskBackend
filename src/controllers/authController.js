const bcrypt=require('bcrypt')
const mongoose = require('mongoose');
const authUser=require('../models/authSchema')
const taskDataSchema=require('../models/taskSchema')
exports.register=async(req,res)=>{
try{
       const UserData = new authUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        if(UserData.name===''){
          return res.status(400).send({mssg:'name is not empty'})
        }
        if(UserData.email===''){
          return res.status(400).send({mssg:'email is not empty'})
        }
        if(UserData.password===''){
          return res.status(400).send({mssg:'password is not empty'})
        }
        if(!UserData.name){
          return res.status(400).send({mssg:'name field is not available'})
        }
        if(!UserData.email){
          return res.status(400).send({mssg:'email field is not available'})
        }
        if(!UserData.password){
          return res.status(400).send({mssg:'password field is not available'})
        }
        const existingUser = await authUser.findOne({
          $or: [
            { name: UserData.name },
            { email: UserData.email },
            { password: UserData.password },
          ],
        });
    
        if (existingUser) {
          return res.status(400).send({
            mssg: 'User with the given name, email, or password already exists',
          });
        }
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
        });
      } else {
        res.status(400).send({ mssg: "Wrong password", response: 400 });
      }
    } catch (e) {
      res.status(400).send({ mssg: "Wrong login details. Please try again.", response: 400 });
    }
  };

  exports.addTask = async (req, res) => {
    try {
     const taskName=req.body.taskName
     const taskDescription=req.body.taskDescription
     const finalTask=new taskDataSchema({
      taskName:taskName,
      taskDescription:taskDescription
     })
    await finalTask.save()
    res.status(200).send(({mssg:'task stored successfully',finalTask:finalTask}))
    } catch (e) {
      res.status(400).send({ mssg: "Wrong task details. Please try again.", response: 400 });
    }
  };

  exports.getAllTask = async (req, res) => {
    try {
    const getAllTaskArray=await taskDataSchema.find()
    res.status(200).send(({mssg:'task fetch successfully',getAllTask:getAllTaskArray}))
    } catch (e) {
      res.status(400).send({ mssg: "Wrong task details. Please try again.", response: 400 });
    }
  };

  exports.getParticularTask = async (req, res) => {
    try {
      const id = req.params.id; 
      const getAllTaskArray = await taskDataSchema.find();
  
      const getTask = getAllTaskArray.find(task => task._id.toString() === id);
  
      if (getTask) {
        res.status(200).send({
          mssg: 'Particular task fetched successfully',
          getParticularTask: getTask
        });
      } else {
        res.status(404).send({
          mssg: 'Task with the given ID does not exist',
          response: 404
        });
      }
    } catch (e) {
      res.status(400).send({
        mssg: 'Wrong task details. Please try again.',
        response: 400
      });
    }
  };
  
  exports.deleteParticularTask = async (req, res) => {
    try {
      const id = req.params.id; 
      const deleteTask=await taskDataSchema.findByIdAndDelete(id)
      if(deleteTask){
        res.status(200).send({mssg:'task delted successfully',delete:deleteTask})
      }
      else{
        res.status(404).send({mssg:'Task with the given ID does not exist'})
      }
    } catch (e) {
      res.status(400).send({
        mssg: 'Wrong task details. Please try again.',
        response: 400
      });
    }
  };
  exports.updateParticularTask = async (req, res) => {
    try {
      const id = req.params.id;
      const { taskName, taskDescription } = req.body;
  
      const updatedTask = await taskDataSchema.findByIdAndUpdate(
        id, 
        { taskName, taskDescription }, 
        { new: true }
      );
  
      if (updatedTask) {
        res.status(200).send({
          mssg: 'Task updated successfully',
          updatedTask
        });
      } else {
        res.status(404).send({
          mssg: 'Task with the given ID does not exist',
          response: 404
        });
      }
    } catch (e) {
      res.status(400).send({
        mssg: 'Wrong task details. Please try again.',
        response: 400
      });
    }
  };
  