import { Request, Response, NextFunction } from 'express'
import logger from './logger'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    res.status(500).json({ message: err.message })
}