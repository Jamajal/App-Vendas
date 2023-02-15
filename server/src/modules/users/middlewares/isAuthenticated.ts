import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";


export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void{
  const authHeader = req.headers.authorization;

  if(!authHeader)
    throw new AppError('JWT Token is missing')

  const [, token] = authHeader.split(' ');
}
