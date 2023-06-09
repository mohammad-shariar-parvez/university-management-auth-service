import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRoute from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes

app.use('/api/v1/users', usersRoute)

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Sucessfully!')
})

export default app
// getting-started.js
// const mongoose = require('mongoose');
