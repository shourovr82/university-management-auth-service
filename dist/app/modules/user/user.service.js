'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const index_1 = __importDefault(require('../../../config/index'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const user_utils_1 = require('./user.utils');
const academicSemesterModel_1 = require('../academicSemester/academicSemesterModel');
const mongoose_1 = __importDefault(require('mongoose'));
const student_model_1 = require('../student/student.model');
const http_status_1 = __importDefault(require('http-status'));
const user_model_1 = require('./user.model');
const faculty_model_1 = require('../faculty/faculty.model');
const users_1 = require('../../../enums/users');
const admin_model_1 = require('../admin/admin.model');
//  create student
const createStudent = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // default password
    if (!user.password) {
      user.password = index_1.default.default_student_pass;
    }
    // set role
    user.role = users_1.ENUM_USER_ROLE.STUDENT;
    const academicSemester =
      yield academicSemesterModel_1.AcademicSemester.findById(
        student.academicSemester
      );
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      // generate student id
      const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
      user.id = id;
      student.id = id;
      const newStudent = yield student_model_1.Student.create([student], {
        session,
      });
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student'
        );
      }
      // set student _id into user  --> user.student
      user.student = newStudent[0]._id;
      const newUser = yield user_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      //
      newUserAllData = newUser[0];
      //
      yield session.commitTransaction();
      yield session.endSession();
      // user  ---> student ---> academicSemester , academicDepartment, academicFaculty
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
    }
    //
    return newUserAllData;
  });
// create faculty
const createFaculty = (faculty, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // default password
    if (!user.password) {
      user.password = index_1.default.default_student_pass;
    }
    // set role
    user.role = users_1.ENUM_USER_ROLE.FACULTY;
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      // generate student id
      const id = yield (0, user_utils_1.generateFacultyId)();
      user.id = id;
      faculty.id = id;
      const newFaculty = yield faculty_model_1.Faculty.create([faculty], {
        session,
      });
      if (
        !(newFaculty === null || newFaculty === void 0
          ? void 0
          : newFaculty.length)
      ) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student'
        );
      }
      // set faculty _id into user  --> user.student
      user.faculty = newFaculty[0]._id;
      const newUser = yield user_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      //
      newUserAllData = newUser[0];
      //
      yield session.commitTransaction();
      yield session.endSession();
      // user  ---> student ---> academicSemester , academicDepartment, academicFaculty
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'faculty',
        populate: [
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
    }
    //
    return newUserAllData;
  });
// create admin
const createAdmin = (admin, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // default password
    if (!user.password) {
      user.password = index_1.default.default_student_pass;
    }
    // set role
    user.role = users_1.ENUM_USER_ROLE.ADMIN;
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      // generate student id
      const id = yield (0, user_utils_1.generateAdminId)();
      user.id = id;
      admin.id = id;
      const newAdmin = yield admin_model_1.Admin.create([admin], { session });
      if (
        !(newAdmin === null || newAdmin === void 0 ? void 0 : newAdmin.length)
      ) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create Admin'
        );
      }
      // set admin _id into user  --> user.admin
      user.admin = newAdmin[0]._id;
      const newUser = yield user_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      // if (newUser.length) {
      //   console.log(newUser);
      //   console.log(user);
      //   throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
      // }
      //
      newUserAllData = newUser[0];
      //
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'admin',
        populate: [
          {
            path: 'managementDepartment',
          },
        ],
      });
    }
    //
    return newUserAllData;
  });
// export
exports.UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
