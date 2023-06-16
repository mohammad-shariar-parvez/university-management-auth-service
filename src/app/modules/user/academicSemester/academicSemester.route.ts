import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema)
);

export const UserRoutes = router;
