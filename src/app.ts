import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import usersRoute from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes

// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1', routes);
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   code: '01',
//   year: '2025',
// };

// const testId = async () => {
//   const testId = await generatedFacultyId();
//   // console.log('TEST ID', testId);
//   return testId;
// };
// testId();
//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error Logger')
// })
//   res.send('Working Sucessfully!')

export default app;
// getting-started.js
// const mongoose = require('mongoose');
