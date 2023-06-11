const express = require("express")
require("./db/mongoose")
const User = require("./models/user")
const Task = require("./models/task")

const app=express()
app.use(express.json())
const port = process.env.Port || 3000


app.post("/users", async (req,res)=>{
    const user = new  User(req.body)
    try {
        await user.save()
        res.status(201).send({status:'success',data:user})
    }
    catch (error){
        res.status(400).send({status:'fail',message:error._message})
        
    }
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400)
    //     res.send(error)
    // })
})

app.get("/users",(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.get("/users/:id",(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        console.log("error");
        res.status(500).send()
    })
})

app.post("/tasks",(req,res)=>{
    const task = new  Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((error)=>{
        res.status(400)
        res.send(error)
    })
})

app.get("/tasks",(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send()
    })
})

app.get("/tasks/:id",(req,res)=>{
    const _id=req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error)=>{
        console.log("error");
        res.status(500).send()
    })
})


app.listen(port,(req,res)=>{
    console.log("Server is Up on Port" + port)
})
