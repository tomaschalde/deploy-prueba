import { NextFunction, Request, Response } from "express";

export function LoggerGlobalMiddleware (req: Request, res: Response, next: NextFunction){

    const actualDate = new Date()

    console.log(`Logueado en la ruta ${req.url}, con el metodo ${req.method}, el día ${actualDate.toLocaleDateString()}, a las ${actualDate.toLocaleTimeString()}`);

    next();
}