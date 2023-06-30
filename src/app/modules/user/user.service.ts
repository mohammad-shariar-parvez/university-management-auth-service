import { IStudent } from './../student/student.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { generatedStudentId } from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // console.log('USER IN SERVICE', user);

  //default pass
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role manually
  user.role = 'student';
  // get academicsemester referred data from student credential
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  //Database Transaction and Rollback operations(ACID)
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //Auto Generated incremental student id and write user & student
    const id = await generatedStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // create student collection
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //add student reference _id to user
    user.student = newStudent[0]._id;

    // create user collection
    const newUser = await Student.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return user;
};

export const UserService = {
  createStudent,
};
