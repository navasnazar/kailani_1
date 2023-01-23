var express = require('express');
const { response } = require('../app');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/register',(req, res)=>{
    let data = req.body
    console.log(data);
    res.json({status:'done'})

})

router.post('/get_available_services', userController.getAvailableServices)

module.exports = router;