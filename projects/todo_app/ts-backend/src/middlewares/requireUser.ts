import { NextFunction, Request, Response } from "express";
import _ from "lodash";
const { get } = _;

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = get(req, "user");
  if (!user) {
    return res.sendStatus(401);
  }
  return next();
};


export default requireUser;