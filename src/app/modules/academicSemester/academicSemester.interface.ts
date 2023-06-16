import { Model } from 'mongoose';

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcamedicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';
export type IAcamedicSemesterCodes = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IAcamedicSemesterTitles;
  year: number;
  code: IAcamedicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

export type AcademicSemeisterModel = Model<IAcademicSemester>;
