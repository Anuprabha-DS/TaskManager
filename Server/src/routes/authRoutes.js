const express = require('express')
const router = express.Router()
// const {auth} = require('../middleware/userMiddleware')
const {registerUser,Login,Logout}= require("../controller/authContoller")

router.post('/register',registerUser)
router.post('/login',Login)
router.post('/logout',Logout)


module.exports = router