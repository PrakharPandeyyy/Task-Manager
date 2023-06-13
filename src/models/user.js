const mongoose = require ("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require("../models/task")


const userSchema =new mongoose.Schema({
    name : {
        type : String,
        trim:true,
        required : true
    },
    email :{
        type : String,
        trim:true,
        unique:true,
        lowercase:true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error (" Email is Invalid")
            }
        }
    },
    password :{
        type : String,
        trim:true,
        minlength:7,
        required : true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error (' Password cannot contain "password"')
            }
        }
    },
    age : {
        type : Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age Must be Positive')
            }
        }
    },
    tokens :[{
        token : {
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
}) 

userSchema.methods.generateAuthToken= async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'yoyohoneysingh',)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function(){  // userSchema.methods.getPublicProfile = function(){
        const user = this 
        const userObject = user.toObject()
    
        delete userObject.password
        delete userObject.tokens
    
        return userObject
    }

userSchema.statics.findByCredentials = async( email , password) =>{
    const user= await User.findOne({email})

    if(!user){
         throw new Error("unable to log in")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("unable to log in")
    }
    return user
}

userSchema.pre('save', async function (next)  {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    
    next()
})

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    const user = this;
    try{
     await Task.deleteMany({ owner: user._id });
     next();
    }catch(error){
        throw new Error()
    }
 })

const User = mongoose.model('User', userSchema )



module.exports = User