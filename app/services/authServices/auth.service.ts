import express, { Request, Response } from "express";
import { User, IUser } from "../../models/User";





const register = async (userData: IUser): Promise<IUser> => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (err: any) {
    throw new Error("fail registration: " + err.message);
  }
};




const login = async (email: string, password: string): Promise<IUser> => {
  try {
    const user = await User.findByCredential(email, password);
    if (user) {
      return user;
    }
    throw new Error("Invalid login credentials");
  } catch (error: any) {
    throw new Error("Login failed: " + error.message);
  }
};

const authService = { register, login };

export default authService;
