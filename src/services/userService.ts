import express from "express";
import { userAppModel } from "../model/userAppModel"
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { createSecretKey } from "crypto";

export class userAppService {
  public static async registerUser(req: express.Request, res: express.Response) {
    try {
      let encryptedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = encryptedPassword;
      let newUser = new userAppModel(req.body);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  public static async updateUser(req: express.Request, res: express.Response) {
    try {
      let userItem: any = await userAppModel.findOneAndUpdate({ "email": req.query.email }, req.body, { new: true }).exec();
      return userItem;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public static async login(req: express.Request, res: express.Response) {
    try {
      let userItem: any = await userAppModel.findOne({ email: req.body.email }).exec();
      if (userItem) {
        let passwordMatch = await bcrypt.compare(req.body.password, userItem.password);
        if (passwordMatch) {
          let options: jwt.SignOptions = { expiresIn: "2h" };
          let payload = { "email": userItem.email, "name": userItem.name };
          let token = await jwt.sign(payload, "secret", options);
          console.log("Token generated is " + token);
          return { "token": token };
        } else {
          return "Password Incorrect";
        }
      } else {
        return "User not registered by Email";
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public static async getAllUser(req: express.Request, res: express.Response) {
    try {
      let allUsers = await userAppModel.find().exec();
      return allUsers;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public static async getUserByEmail(req: express.Request, res: express.Response) {
    try {
      console.log("name from queryString : ", req.query.email);
      let userItem = await userAppModel.findOne({ name: req.query.email }).exec();
      return userItem;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
