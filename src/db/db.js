const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1/registrationProjet").then(()=>{
    console.log("Database connected successfully")
}).catch(()=>{
    console.log("unable to connect ")
})
