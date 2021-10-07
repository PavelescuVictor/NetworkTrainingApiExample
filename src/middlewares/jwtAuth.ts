import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export const secret = "ABCDEFGHIJKLMNOPQRSTUVXYZ";


export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.header('Authorization');

  if(!authHeader) {
    res.send(403);
    return;
  }

  const [ type, token ] = authHeader.split(' ');

  if(type !== 'Bearer') {
    res.send(403);
    return;
  }

  try {
    const decoded = verify(token, secret);
    next();
  } catch (error) {
    res.send(403);
  }

};