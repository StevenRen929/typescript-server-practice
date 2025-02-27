

import { promises } from "dns";
import startServer from "./express";
import connectDB from "./mongoose";

const init = async () :Promise<void> => {
  try {
    await connectDB();
    startServer(); 
    console.log(" Server and database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize app:", error);
    process.exit(1); 
  }
};

export default init;