import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<Connection> => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
  }

  try {
    const connection = await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log(`Database connected to ${dbUrl}`);
    return connection.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default connectDB;