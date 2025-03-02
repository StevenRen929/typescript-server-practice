import express, { Router } from 'express';
import authController from '../../controllers/usersControllers/auth.controller';
import authMiddleware from '../../middleware/auth.middleware';

const router= express.Router(); 

router.post("/register", authController.registerController); 
router.post("/login", authController.loginController); 
router.get("/me",authController.userMeController)
export default router;