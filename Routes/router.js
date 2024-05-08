const express = require('express')
const userController = require('../controller/userController')
const projectController = require('../controller/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/multerMiddleware')


const router = new express.Router()

//register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//add project
router.post("/add-project",jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)


//get allprojects
router.get("/all-projects",jwtMiddleware,projectController.getAllProjects)

//get userprojects
router.get("/user-projects",jwtMiddleware,projectController.getUserProjects)

//get homeprojects
router.get("/home-projects",projectController.getUserProjects)

//edit project 
 router.put('/edit-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)
// router.put('/edit-project/:pid',jwtMiddleware,multerConfig.array('projectImage',4),projectController.editProject)


//remove
router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)
 module.exports = router