const mongoose = require("mongoose");
const taskSchema=mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    taskDescription: {
        type: String,
        required: true,
      }
})


const taskData = new mongoose.model("taskBackend", taskSchema);
// const registerUser = new mongoose.model("ApnaPanUserDatas", authSchema);
module.exports = taskData;