import mongoose from "mongoose";
import devApp from "./index.config";
import chalk from "chalk";


const connectDB = async() => {
  try {
    const db =  await mongoose.connect(String(devApp.dev.db.uri));
    console.log(chalk.cyanBright(`MongoDB Connected: ${db.connection.host}`));
  } catch (error) {
    console.log(chalk.red(`Error: ${error}`));

  }
};
 
export default connectDB;