import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'Something went Wrong'
  const errorMessage: IGenericErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
//   if (err instanceof Error) {
//     res.status(400).json({ error: err })
//   } else {
//     res.status(500).json({ error: 'Something went Wrong' })
//   }
