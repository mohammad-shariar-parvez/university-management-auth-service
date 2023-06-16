import { Schema, model } from 'mongoose';
import {
  AcademicSemeisterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Falling'],
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
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
