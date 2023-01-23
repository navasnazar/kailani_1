var express = require('express');
const { response } = require('../app');
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../controllers/auth')


router.post('/login',adminController.adminLogin)
router.post('/recovermail',adminController.passRecover)
router.post('/resetpass', auth, adminController.resetPassword)
router.get('/services', adminController.getServices)
router.post('/addServices', adminController.addService)
router.post('/editServices', adminController.editService)
router.post('/delServices',adminController.delService) 


module.exports = router;        