import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constants';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is Required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is Required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is Required',
      }),
      email: z
        .string({
          required_error: 'Email is Required',
        })
        .email(),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is Required',
        })
        .optional(),

      contactNo: z.string({
        required_error: 'Contact number is Required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact number is Required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is Required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is Required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is Required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is Required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is Required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name is Required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is Required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact No is Required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is Required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is Required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact No is Required',
        }),
        address: z.string({
          required_error: 'Guardians Address is Required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local Guardian Name is required',
        }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian Contact No is required',
        }),
        address: z.string({
          required_error: 'Local Guardian Address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

// await createUserZodSchema.parseAsync(req);

export const UserValidation = {
  createUserZodSchema,
};
