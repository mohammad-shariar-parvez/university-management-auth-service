import express, { Application } from 'express'
import cors from 'cors'
import usersRoute from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes

app.use('/api/v1/users', usersRoute)

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Sucessfully!')
//   // throw new ApiError(400, 'Ore Baba Error')
//   // next('Error from server ')
// })

app.use(globalErrorHandler)

export default app
// getting-started.js
// const mongoose = require('mongoose');
