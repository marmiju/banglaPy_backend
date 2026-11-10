import { Request, Response, NextFunction } from "express";

export const isLogedIn = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ msg: "Unauthoriezd", success: false });
    return;
  }
  next();
};

