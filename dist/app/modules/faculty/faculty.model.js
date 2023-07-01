'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Faculty = exports.FacultySchema = void 0;
const mongoose_1 = require('mongoose');
const faculty_constants_1 = require('./faculty.constants');
exports.FacultySchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: faculty_constants_1.facultyGender,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: faculty_constants_1.facultyBloodGroup,
    },
    designation: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicFaculty: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.Faculty = (0, mongoose_1.model)('Faculty', exports.FacultySchema);
