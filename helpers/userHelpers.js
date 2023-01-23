const ServiceDB = require('../models/adminModel/serviceSchema')
const objectId=require('mongodb').ObjectId

module.exports={
    findServices:((data)=>{
        return new Promise(async(resolve, reject)=>{
            await ServiceDB.find().then((value)=>{
                if(value){
                    resolve(value)
                }else{
                    const text = 'data not fount'
                    resolve(text)
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    })  
    
}