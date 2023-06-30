"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const student_constants_1 = require("../student/student.constants");
const faculty_constants_1 = require("../faculty/faculty.constants");
const admin_constants_1 = require("../admin/admin.constants");
// create student
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is Required',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle name is required',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name is Required',
                }),
            }),
            gender: zod_1.z.enum([...student_constants_1.gender], {
                required_error: 'Gender is Required',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is Required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is Required',
            })
                .email(),
            bloodGroup: zod_1.z
                .enum([...student_constants_1.bloodGroup], {
                required_error: 'Blood Group is Required',
            })
                .optional(),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is Required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency Contact number is Required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present Address is Required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent Address is Required',
            }),
            academicSemester: zod_1.z.string({
                required_error: 'Academic Semester is Required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic Faculty is Required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic Department is Required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father Name is Required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father Occupation is Required',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father Contact No is Required',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother Name is Required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother Occupation is Required',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother Contact No is Required',
                }),
                address: zod_1.z.string({
                    required_error: 'Guardians Address is Required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local Guardian Name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local Guardian Occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local Guardian Contact No is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Local Guardian Address is required',
                }),
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
// create faculty
const createFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        faculty: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is Required',
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name is Required',
                }),
            }),
            gender: zod_1.z.enum([...faculty_constants_1.facultyGender], {
                required_error: 'Gender is Required',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is Required',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is Required',
            })
                .email(),
            bloodGroup: zod_1.z
                .enum([...faculty_constants_1.facultyBloodGroup], {
                required_error: 'Blood Group is Required',
            })
                .optional(),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is Required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency Contact number is Required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present Address is Required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent Address is Required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is Required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic Department is Required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic Faculty is Required',
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
// create admin
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        admin: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First Name is Required',
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last Name is Required',
                }),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of Birth is Required',
            }),
            gender: zod_1.z.enum([...admin_constants_1.adminGender], {
                required_error: 'Gender is Required',
            }),
            bloodGroup: zod_1.z
                .enum([...admin_constants_1.adminBloodGroup], {
                required_error: 'Blood Group is Required',
            })
                .optional(),
            email: zod_1.z
                .string({
                required_error: 'Email is Required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is Required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency Contact number is Required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present Address is Required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent Address is Required',
            }),
            designation: zod_1.z.string({
                required_error: 'Designation is Required',
            }),
            managementDepartment: zod_1.z.string({
                required_error: 'Management Department is Required',
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
// await createUserZodSchema.parseAsync(req);
exports.UserValidation = {
    createStudentZodSchema,
    createFacultyZodSchema,
    createAdminZodSchema,
};
