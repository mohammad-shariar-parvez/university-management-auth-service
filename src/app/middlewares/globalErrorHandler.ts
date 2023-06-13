/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('Golbal error handler ', error)
    : errorLogger.error('Golbal error handler ', error)

  let statusCode = 500
  let message = 'Something went Wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (error?.name === 'ValidatonError') {
    console.log('YOOOO 1111')

    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    console.log('YOOOO 2222222')
    statusCode = error?.statusCode
    message = error.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    console.log('YOOOO 33333')
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
//   if (err instanceof Error) {
//     res.status(400).json({ error: err })
//   } else {
//     res.status(500).json({ error: 'Something went Wrong' })
//   }
