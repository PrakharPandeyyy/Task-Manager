const express = require("express")
const User = require("../models/user")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post("/users", async (req,res)=>{
    const user = new  User(req.body)
    const token = await user.generateAuthToken()
    try {
        await user.save()
        res.status(201).send({status:'success',data:{user,token} })
    }
    catch (error){
        res.status(400).send({status:'fail',message:error})
        
    }

})

router.post("/users/login" , async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token})
    }
    catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.get("/users/me", auth , async (req,res)=>{
    res.send(req.user)
    
})

router.get("/users/:id",async (req,res)=>{
    const _id=req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send({status:'fail',message:error._message})
        }
        res.send({status:'success',data:user})
    }
   catch(error){
        console.log("error");
        res.status(500).send({status:'fail',message:error._message})
    }
})

router.patch("/users/:id", async (req,res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        const user = await User.findById(req.params.id)
        
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()

        // const user= await User.findByIdAndUpdate(req.params.id, req.body , { new : true , runValidators : true})
        if(!user){
            return res.status(404).send({status:'fail',message:error._message})
        }
        res.send({status:'success',data:user})
    }
    catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.delete("/users/:id",async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send({status:'fail',message:error._message})
        }
        res.send({status:'success',data:user})
    }
    catch (error){
        res.status(500).send({status:'fail',message:error._message})
    }
})

module.exports = router