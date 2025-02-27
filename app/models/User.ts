import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define the User interface (including instance and static methods)
interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  language: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  findByCredential(email: string, password: string): Promise<IUser>;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Add findByCredential static method
//this function was mounted on IUserModel dont need to write promise:<Iuser>
UserSchema.statics.findByCredential = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Error("Invalid credentials");
  }
  return user;
};

// Create and export the User model
const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export { User, IUser };
