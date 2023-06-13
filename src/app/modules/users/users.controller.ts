import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body

    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (error) {
    // console.log(error)

    // res.status(400).json({
    //   success: false,
    //   message: error,
    // })

    next(error)
  }
}

export default { createUser }
