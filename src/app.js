const http=require('http')
const express=require('express')
const db = require('./db/db');
const authRoutes=require('./views/authRoutes')
const app=express()
app.use(express.json())
app.use('/auth',authRoutes)
const server=http.createServer(app)
const port=process.env.PORT||3000
server.listen(port,()=>{
    console.log(`server listen on port ${port}`)
})