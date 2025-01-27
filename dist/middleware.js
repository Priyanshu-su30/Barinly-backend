"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_PASSWORD);
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            });
            return;
        }
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
};
exports.userMiddleware = userMiddleware;
// import { NextFunction, Request, Response } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { JWT_PASSWORD } from './config';
// declare global {
//   namespace Express {
//     interface Request {
//       userId?: string;
//     }
//   }
// }
// export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const header = req.headers['authorization'];
//   try {
//     const decoded = jwt.verify(header as string, JWT_PASSWORD) as JwtPayload;
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(403).json({
//       message: 'You are not logged in',
//     });
//   }
// };