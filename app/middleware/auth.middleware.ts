import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: any; // 可以进一步细化类型，比如 IUser
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) :void => {
  const authHeader = req.headers.authorization;
  const authType = authHeader?.split(" ")[0];
  const authToken = authHeader?.split(" ")[1];

  console.log(  authHeader,authType,authToken
  )

  if (!authHeader || authType !== "Bearer" || !authToken) {
   res.status(401).json({ error: "Access denied. No token provided." });
   return;
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string);
    req.user = decoded; // 把解码后的用户信息挂载到 req.user
    next(); // 继续执行下一个中间件或路由处理函数
  } catch (err) {
     res.status(403).json({ error: "Invalid or expired token." });
     return
  }
};

export default authMiddleware;