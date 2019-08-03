import { userAppController } from "../controller/userController"
import { Router } from "express";

let userControllerObj = new userAppController();
export const userRoutes: Router = Router();

userRoutes.put('/updateUser', userControllerObj.updateUser);
userRoutes.get('/getUserByEmail', userControllerObj.getUserByEmail);
userRoutes.get('/getAllUser', userControllerObj.getAllUser);

