import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;
  
  if (!token) return res.status(401).json({ auth: false, message: 'Invalid token.' });
  
  jwt.verify(token, process.env.SECRET!, function(err, decoded) {
    if (err) return res.status(401).json({ auth: false, message: 'Invalid token.' });
    
    const userInfo: JwtPayload = decoded as JwtPayload;
    req.body.accountId = userInfo.id;
    
    next();
  })
};