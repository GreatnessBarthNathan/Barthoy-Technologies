import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    (err as any)?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const msg: string = err.message || "Something went wrong, try again later"
  res.status(statusCode).json({ msg })
}

export default errorHandler
