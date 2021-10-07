import { Request, Response, NextFunction } from "express";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.header('Authorization');

  if(!authHeader) {
    res.send(403);
    return;
  }

  const [ type, token ] = authHeader.split(' ');
  const code = "VmljdG9yOnB1YmxpYw==";

  if(type !== 'Basic') {
    res.send(403);
    return;
  }

  if(token !== code) {
    res.sendStatus(403);
    return;
  }
  

  next();

};