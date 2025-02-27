import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from '../routes/v1/api'
dotenv.config();


 const startServer = ():Express => {
    const expressApplication = express();
    //must add this line after create express app
    expressApplication.use(express.json());
    expressApplication.use('/api/v1', router);
    
    expressApplication.listen(process.env.PORT, (err?:any) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log("SERVER STARTED:", process.env.PORT);
    });
    return expressApplication;
  };

  export default startServer

