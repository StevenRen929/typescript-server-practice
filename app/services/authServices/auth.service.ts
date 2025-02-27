import express,{Request,Response} from 'express';
import {User,IUser} from '../../models/User'


const register  = async (userData: IUser) => {
    try {
        const newUser = new User(userData);
        await newUser.save();  
        return newUser;  
    } catch (err: any) {
        throw new Error('fail registration: ' + err.message);
    }
  };

  const authService = { register };

  export default authService;