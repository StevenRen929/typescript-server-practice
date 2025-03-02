import express, { Request, Response } from "express";
import { User, IUser } from "../../models/User";
import jwt from "jsonwebtoken"




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
      //token have not been stored yet 
      //only throw on Console for testing
      const token = user.generateAuthToken();
      console.log(token);
      return user;
    }
    throw new Error("Invalid login credentials");
  } catch (error: any) {
    throw new Error("Login failed: " + error.message);
  }
};


//userme service enable users with token to access his/her personal info

const userMe = async (accessToken: string): Promise<IUser> => {
  try {
    const decoded: any = jwt.verify(accessToken, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw new Error("Failed to fetch user info: " + error.message);
  }
};

const authService = { register, login, userMe };

export default authService;
