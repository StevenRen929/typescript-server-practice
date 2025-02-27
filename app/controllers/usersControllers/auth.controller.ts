import { IUser } from "../../models/User";
import authServices from "../../services/authServices/auth.service";
import express, { Express, Request, Response } from 'express' 



const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;
    //console.log(req)
    const result = await authServices.register(userData);
    res.status(201);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginInfo = req.body;
    const result = await authServices.login(loginInfo.email, loginInfo.password);
    res.status(200).json({message:`welcome ${result.name}`});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    
  }
};

export default {
  registerController,
  loginController
};