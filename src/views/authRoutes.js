const express=require('express')
const router=express.Router()
const authController=require('../controllers/authController')
const authenticate=require('../authMiddleware')
router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/tasks',authenticate,authController.addTask)
router.get('/tasks',authenticate,authController.getAllTask)
router.get('/tasks/:id',authenticate,authController.getParticularTask)
router.delete('/tasks/:id',authenticate,authController.deleteParticularTask)
router.put('/tasks/:id', authenticate,authController.updateParticularTask);
module.exports=router