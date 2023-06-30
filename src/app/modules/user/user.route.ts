import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  // validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const UserRoutes = router;
