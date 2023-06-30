import { IStudent } from './../student/student.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { generatedStudentId } from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { User } from './user.model';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default pass
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role manually
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  let newUserAllData = null;

  //Database Transaction and Rollback operations(ACID)
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //Auto Generated incremental student id and write user & student
    const id = await generatedStudentId(academicSemester as IAcademicSemester);
    user.id = id;
    student.id = id;

    // create student collection
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //add student reference _id into user.student
    user.student = newStudent[0]._id;

    // create user collection
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
