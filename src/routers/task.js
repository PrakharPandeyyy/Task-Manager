const express = require("express")
const Task = require("../models/task")

const router = new express.Router()

router.post("/tasks",async (req,res)=>{
    const task = new  Task(req.body)
    try {
        await task.save()
        res.status(201).send({status:'success',data:task})
    }
   catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.get("/tasks",async (req,res)=>{
    try {
        const task=await Task.find({})
        res.status(201).send({status:'success',data:task})
    }
    catch(error){
        res.status(500).send({status:'fail',message:error._message})
    }
})

router.get("/tasks/:id",async (req,res)=>{
    const _id=req.params.id
    try{
    const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send({status:'fail',message:error._message})
        }
        res.send({status:'success',data:task})
    }
    catch(error){
        console.log("error");
        res.status(500).send({status:'fail',message:error._message})
    }
})

router.patch("/tasks/:id", async (req,res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        const task= await Task.findByIdAndUpdate(req.params.id, req.body , { new : true , runValidators : true})
        if(!task){
            return res.status(404).send({status:'fail',message:error._message})
        }
        res.send({status:'success',data:task})
    }
    catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.delete("/tasks/:id",async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send({status:'fail',message:error._message})
        }
        res.send({status:'success',data:task})
    }
    catch (error){
        res.status(500).send({status:'fail',message:error._message})
    }
})

module.exports = router