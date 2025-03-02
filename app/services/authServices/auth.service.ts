import express, { Request, Response } from "express";
import { User, IUser } from "../../models/User";
import jwt from "jsonwebtoken";
import mongoose, { ObjectId } from "mongoose";

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
const userMe = async (
  accessToken: string
): Promise<{
  id: string;
  name: string;
  email: string;
  phone: string;
  language: string;
}> => {
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as { id: string; iat: number; exp: number };
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }
    const userData = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      language: user.language,
    };
    return userData;
  } catch (error: any) {
    throw new Error("Failed to fetch user info: " + error.message);
  }
};

const authService = { register, login, userMe };

export default authService;
