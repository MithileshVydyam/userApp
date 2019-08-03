import express, { response } from "express";
import { userRoutes } from "../routes/userRoutes";
import { AuthenticateService } from "../middleware/authenticate";
import { userAppController } from "../controller/userController"
import { request } from "http";

export class Routes {
  constructor() {
  }
  public static configRoutes(app: express.Application): void {
    app.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).json({ "Success": "Server is running" })
    });
    let userControllerObj = new userAppController();
    app.post('/register', userControllerObj.registerUser);
    app.post('/login', userControllerObj.login);
    app.use(AuthenticateService.authenticate);
    app.use('/user', userRoutes);
  }

}