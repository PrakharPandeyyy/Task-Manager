const mongoose = require ("mongoose")
const validator = require("validator")

const User = mongoose.model('User',{
    name : {
        type : String,
        trim:true,
        required : true
    },
    email :{
        type : String,
        trim:true,
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
    }
}) 

module.exports = User