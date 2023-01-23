const { response } = require('../app');
const adminHelpers = require('../helpers/adminHelpers')
const sendMail = require('../controllers/sendMail')
const jwt = require('jsonwebtoken');
const e = require('express');
const bcrypt = require('bcrypt')
const AdminDB = require('../models/adminModel/adminSchema')


const {
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    ACTIVATION_TOKEN_SECRET,
    CLIENT_URL
} = process.env

const createAccessToken = (payload)=>{
    return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
}


module.exports={
    adminLogin:((req, res)=>{
        let data = req.body
        console.log('hhh:',data);
        adminHelpers.login(data).then((response)=>{
            const [validation, token]=response
            if(validation.done){
                res.json({status:'done', admin:token})
            }
            if(validation.err){
                res.json({status:'username Err'})
            }
            if(validation.passErr){
                res.json({status:'password Err'})
            }
        })
    }),
    passRecover:((req, res)=>{
        let recMail = req.body.reqMail
        console.log('recovery mail: ', recMail);
        adminHelpers.recoverPassword(recMail).then((data)=>{
            if(data.validation.done){
                const access_Token = createAccessToken({ id: data.res.id });
                const url = `${CLIENT_URL}/admin/resetpass/${access_Token}`;

                sendMail(recMail, url, "Reset Your password");
                res.json({
                  msg: "Reset password link successfully send please check your email!",
                });
            }
        })
    }),
    resetPassword:(async(req, res)=>{
        try {
            const password = req.body.password
            console.log('PASSSS',password);
            const passwordHash = await bcrypt.hash(password, 12)

            await AdminDB.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({status: "done"})
        } catch (err) {
            return res.status(500).json({msg: err.msg})
        }
    }),
    getServices:(async(req, res)=>{
        adminHelpers.getAllService().then((response)=>{
            let allServices = response
            res.json({allServices})
        })
    }),
    addService:(async(req, res)=>{
        let serviceData = req.body
        console.log("service: ",serviceData);

        adminHelpers.addNewService(serviceData).then((response)=>{
            res.json({status:'done', id:serviceData._id})
        })
    }),
    editService:(async(req, res)=>{
        let editedData = req.body
        console.log("Edited Data: ",editedData);
        adminHelpers.editService(editedData).then((response)=>{
            res.json({status:'done', id:editedData._id})
        })
    }),
    delService:(async(req, res)=>{
        let deletedData = req.body
        console.log("Deleted Data: ",deletedData);
        adminHelpers.deleteService(deletedData).then((response)=>{
            res.json({status:'done', id:deletedData._id})
        })
    })
} 