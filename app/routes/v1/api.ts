import express, { Router } from 'express';
import authController from '../../controllers/usersControllers/auth.controller';

const router= express.Router(); 

router.post("/register", authController.registerController); 
router.post("/login", authController.loginController); 

export default router;