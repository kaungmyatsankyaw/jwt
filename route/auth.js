let express=require('express');
let router=express.Router();
let authController = require('../controllers/authController');

/*****   Register   ******/
router.post('/register',authController.register);

/********* Login  **********/
router.post('/login',authController.login);

module.exports=router;