// // const mongodb= require('mongodb')
// // const MongoClient = mongodb.MongoClient


// // async function f1(){
    
//     //     try{
//         //         const client = await MongoClient.connect('mongodb://127.0.0.1:27017/',{ useNewUrlParser:true })
//         //         const db = await client.db("task-manager")
//         //         await db.collection('users').insertOne({
//             //             name: "PP"
//             //         },(error,result) => {
//                 //             if(error){
//                     //                 console.log("Unable to insert data")
//                     //             }
//                     //             console.log(result.insertedIds)
//                     //         })
//                     //     }
                    
//                     //     catch(error){
//                         //         console.log("Not able to connect")
//                         //     }
                        
                        
//                         // }
//                         // f1()
                        
                        
// // const MongoClient = require('mongodb-legacy').MongoClient // to use the depricated version of mongodb 

// const {MongoClient , ObjectID }=require("mongodb-legacy")
                        
// MongoClient.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser: true}, function (error, client) {
//     if (error) {
//         return console.log('Unable to connect to database')
//     }
    
//     const db = client.db('task-manager')
 
//     // db.collection('users').insertOne({
//     //     name: 'Raj',
//     //     age: 27
//     // }, function (error, result)  {
//     //     if (!error) {
//     //         console.log(result.insertedId)
            
//     //     }
//     // else{
//     //     return console.log('Unable to insert users')
//     // }
//     // })
 
//     db.collection('users').updateOne({
//         name:"Raj"
//     },{
//         $set :{
//             name:"Prakhar"
//         }
//     }).then((result)=>{
//         console.log(result);
//     }).catch((error)=>{
//         console.log(error);
//     })
// })