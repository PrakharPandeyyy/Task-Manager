const express = require("express")
const Task = require("../models/task")
const auth = require("../middleware/auth")


const router = new express.Router()

router.post("/tasks", auth ,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.status(201).send({status:'success',data:task})
    }
   catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.get("/tasks",auth , async (req,res)=>{
    try {
        // const task=await Task.find({owner :req.user._id})
        
        const user = await req.user.populate('tasks')
        res.status(201).send({status:'success',data:user.tasks})
    }
    catch(error){
        res.status(500).send({status:'fail',message:error._message})
    }
})

router.get("/tasks/:id",auth ,async (req,res)=>{
    const _id=req.params.id
    try{
        
    const task = await Task.findOne({_id, owner : req.user._id})

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

router.patch("/tasks/:id", auth , async (req,res) => { 
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        
        const task = await Task.findOne({_id : req.params.id, owner : req.user._id})
        
        
        if(!task){
            return res.status(404).send({status:'fail',message:error._message})
        }
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        res.send({status:'success',data:task})
    }
    catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.delete("/tasks/:id",auth , async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id :req.params.id,owner : req.user._id})
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