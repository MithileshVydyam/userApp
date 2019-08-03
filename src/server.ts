import express from 'express';
import * as bodyparser from "body-parser";
import { Db } from "./startup/db";
import { Routes } from "./startup/route";
class UserApp {
  app: express.Application;
  constructor() {
    this.app = express();
    this.app.listen(3000, 'localhost', (req, res) => {
      console.log("server is started and running on port 3000");
    });
    this.configBodyParser();
    Routes.configRoutes(this.app);
    Db.connectToMongoDb();
  }
  private configBodyParser() {
    //code to view the Body
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: false }));
  }

}

export const userApp = new UserApp();