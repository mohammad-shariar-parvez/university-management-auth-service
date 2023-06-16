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

export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: acamedicSemesterTitles,
    },
    year: {
      type: Number,
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

// 3. Create a Model.
export const AcademicSemester = model<
  IAcademicSemester,
  AcademicSemeisterModel
>('AcademicSemester', academicSemesterSchema);
