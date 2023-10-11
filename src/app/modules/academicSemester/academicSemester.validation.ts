import { z } from 'zod';
import {
  acamedicSemesterCodes,
  acamedicSemesterMonths,
  acamedicSemesterTitles,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...acamedicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...acamedicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...acamedicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start months is required',
    }),
    endMonth: z.enum([...acamedicSemesterMonths] as [string, ...string[]], {
      required_error: 'End months is required',
    }),
  }),
});
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...acamedicSemesterTitles] as [string, ...string[]])
        .optional(),
      year: z.string().optional(),
      code: z
        .enum([...acamedicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...acamedicSemesterMonths] as [string, ...string[]])
        .optional(),
      endMonth: z
        .enum([...acamedicSemesterMonths] as [string, ...string[]])
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
