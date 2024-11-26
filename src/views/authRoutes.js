const express=require('express')
const router=express.Router()
const authController=require('../controllers/authController')
const verifyRole=require('../verifyRole')
router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/admin', verifyRole(['admin']),authController.getAdminUser);
module.exports=router