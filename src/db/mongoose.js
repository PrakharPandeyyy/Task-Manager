const mongoose = require ("mongoose")
const validator = require("validator")


mongoose.connect("mongodb://localhost:27017/task-manager-api",{
    useNewUrlParser:true

})

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

const me = new User ({
    name:"Prakhar",
    email :'p.com',
    age:10
})
me.save().then(()=>{
    console.log(me);
}).catch( (error) => {
    console.log(error)
})
 
