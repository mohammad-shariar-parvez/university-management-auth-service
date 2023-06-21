import { Schema, model } from 'mongoose';
import {
  AcademicSemeisterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  acamedicSemesterCodes,
  acamedicSemesterMonths,
  acamedicSemesterTitles,
} from './academicSemester.constant';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: acamedicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: acamedicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: acamedicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: acamedicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist !'
    );
  }
  next();
});

// 3. Create a Model.
export const AcademicSemester = model<
  IAcademicSemester,
  AcademicSemeisterModel
>('AcademicSemester', academicSemesterSchema);
