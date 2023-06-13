const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const jwt = require('jsonwebtoken')

const app=express()
 


app.use(express.json())
const port = process.env.Port || 3000

app.use(userRouter)
app.use(taskRouter)





app.listen(port,(req,res)=>{
    console.log("Server is Up on Port" + port)
})
