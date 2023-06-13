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
        
        
        res.send({user , token}) // res.send({user : user.getPublicProfile() , token})
    }
    catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.post("/users/logout", auth , async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch (error){
        res.status(00).send({status:'fail',message:error._message})
    }
} )

router.post("/users/logoutAll", auth , async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch (error){
        res.status(500).send({status:'fail',message:error._message})
    }
} )

router.get("/users/me", auth , async (req,res)=>{
    res.send(req.user)
    
})



router.patch("/users/me", auth , async (req,res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
        res.send({status:'success',data:req.user})
    }
    catch(error){
        res.status(400).send({status:'fail',message:error._message})
    }
})

router.delete("/users/me", auth , async (req,res)=>{
    try{
        console.log(req.user)
        await req.user.deleteOne()
        res.send({status:'success',data:req.user})
    }
    catch (error){
        res.status(500).send({status:'fail',message:error._message})
    }
})

module.exports = router