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
  syncId: string;
};

export type AcademicSemeisterModel = Model<IAcademicSemester>;

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
export type IAcademicSemesterCreatedEvent = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
