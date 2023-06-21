import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is Required',
    }),
    academicFaculty: z.string({
      required_error: 'academic Faculty is required! ',
    }),
  }),
});
// update
const updateDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

// exports
export const AcademicDepartmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
