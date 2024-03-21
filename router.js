const express=require('express')

const usercontroller=require('./usercontroller')

const router=new express.Router()

router.post('/api/register',usercontroller.registerUser)

router.post('/api/login',usercontroller.userlogin)

router.get('/api/protected',usercontroller.protected)

router.put('/api/update',usercontroller.protected,usercontroller.updateuser)

router.delete('/api/delete/:id',usercontroller.protected,usercontroller.deleteuser)

router.get('/api/getuser',usercontroller.getusers)


module.exports=router