"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = require("../controller/userController");
var express_1 = require("express");
var userControllerObj = new userController_1.userAppController();
exports.userRoutes = express_1.Router();
exports.userRoutes.put('/updateUser', userControllerObj.updateUser);
exports.userRoutes.get('/getUserByEmail', userControllerObj.getUserByEmail);
exports.userRoutes.get('/getAllUser', userControllerObj.getAllUser);
