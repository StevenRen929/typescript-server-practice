import express, { Router } from 'express';
import authController from '../../controllers/usersControllers/auth.controller';

const router: Router = express.Router(); 

router.post("/register", authController.register); 
router.post("/login", authController.login); 

export default router;