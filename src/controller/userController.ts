import express from "express";
import { userAppService } from "../services/userService"

export class userAppController {

  constructor() { }
  public async registerUser(req: express.Request, res: express.Response) {
    let result = await userAppService.registerUser(req, res);
    res.json(result);
  }
  public async getAllUser(req: express.Request, res: express.Response) {
    let result = await userAppService.getAllUser(req, res);
    res.json(result);
  }
  public async getUserByEmail(req: express.Request, res: express.Response) {
    let result = await userAppService.getUserByEmail(req, res);
    res.json(result);
  }
  public async login(req: express.Request, res: express.Response) {
    let result = await userAppService.login(req, res);
    res.json(result);
  }
  public async updateUser(req: express.Request, res: express.Response) {
    let result = await userAppService.updateUser(req, res);
    res.json(result);
  }

}