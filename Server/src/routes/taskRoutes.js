const express = require('express')
const router = express.Router()
const {auth} = require('../middleware/userMiddleware')
const {createTask,getTasks,getTaskById,updateTask,deleteTask}= require("../controller/taskContoller")

router.post('/addTask',auth,createTask)
router.get('/viewTasks',auth,getTasks)
router.get('/viewTaskById/:id',auth,getTaskById)
router.put('/updateTask/:id',auth,updateTask)
router.delete('/deleteTask/:id',auth,deleteTask)






module.exports = router