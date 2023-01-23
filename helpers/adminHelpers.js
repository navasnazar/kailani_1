const { response } = require('../app');
const AdminDB = require('../models/adminModel/adminSchema')
const ServiceDB = require('../models/adminModel/serviceSchema')
const jwt = require('jsonwebtoken');
const e = require('express');
const bcrypt = require('bcrypt')
const objectId=require('mongodb').ObjectId


module.exports={
    login:(data)=>{
        let validation={done:false, err:false, passErr:false}
        return new Promise(async(resolve, reject)=>{
            adminData = await AdminDB.findOne({username:data.username})
            console.log('xxx',adminData);
            if(adminData){ 
                const isMatch = await bcrypt.compare(data.password, adminData.password)
                if(!isMatch){
                    validation.passErr=true
                    resolve([validation])
                }else{
                    validation.done=true
                    const token = jwt.sign(
                    {admin:data.username},"secret123")
                    console.log('token:',token);
                    resolve([validation,token])
                }
            }else{
                validation.err=true
                resolve([validation])
            }
        })
    },    
    recoverPassword:(recMail)=>{
        let validation={done:false, err:false}
        return new Promise(async(resolve, reject)=>{
            await AdminDB.findOne({username:recMail}).then((res)=>{
                if(res){
                    console.log('done',res);
                    validation.done=true;
                    resolve({validation, res})
                }else{
                    validation.err=true;
                    resolve(validation)
                }
            }).catch((err)=>{
                console.log('error',err);
            })
        })
    },
    getAllService:()=>{
        return new Promise(async(resolve, reject)=>{
            ServiceDB.find().then((data)=>{
                resolve(data)
            }).catch((e)=>{
                console.log(e);
            })
        })
    },
    addNewService:(data)=>{
        return new Promise(async(resolve, reject)=>{
            let new_service = new ServiceDB({
                title: data.data.title,
                service: data.data.service,
                description: data.data.description,
                amount: data.data.amount,
                img1_url: data.img1_url,
                img2_url: data.img2_url,
                img3_url: data.img3_url,
                img4_url: data.img4_url,

            })
            new_service.save().then((response)=>{
                resolve(response)
            })
        })
    },
    editService:(editedData)=>{
        return new Promise(async(resolve, reject)=>{
            ServiceDB.updateOne({_id:objectId(editedData._id)},
            {$set:{
                title: editedData.title,
                service: editedData.service,
                description: editedData.description,
                amount: editedData.amount
                }
            }).then((response)=>{
                resolve(response)
            }).catch((e)=>{
                console.log(e);
            })
        })
    },
    deleteService:(deletedData)=>{
        return new Promise(async(resolve, reject)=>{
            ServiceDB.remove({_id:objectId(deletedData._id)}).then((response)=>{
                resolve(response)
            }).catch((e)=>{
                console.log(e);
            })
        })
    }
}