import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  language: string;
  password: string;
}

// Define the User schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model<IUser>("User", UserSchema);

// Export the User model and IUser interface
export { User };